#!/usr/bin/env bash
set -o errexit #abort if any command fails

deploy_directory=.build

#repository to deploy to. must be readable and writable.
repo=origin

commit_title=`git log -n 1 --format="%s" HEAD`
commit_hash=`git log -n 1 --format="%H" HEAD`
previous_branch=`git rev-parse --abbrev-ref HEAD`

if [[ $1 = "-v" || $1 = "--verbose"  || $2 = "-v" || $2 = "--verbose" ]]; then
    verbose=true
fi

#echo expanded commands as they are executed (for debugging)
function enable_expanded_output {
    if [ $verbose ]; then
        set -o xtrace
        set +o verbose
    fi
}

#this is used to avoid outputting the repo URL, which may contain a secret token
function disable_expanded_output {
    if [ $verbose ]; then
        set +o xtrace
        set -o verbose
    fi
}

enable_expanded_output


if ! git diff --exit-code --quiet --cached; then
    echo Aborting due to uncommitted changes in the index
    exit 1
fi

set +o errexit
diff=$(git --work-tree "$deploy_directory" diff --exit-code --quiet HEAD)$?
set -o errexit
case $diff in
    0) echo No changes to files in $deploy_directory. Skipping commit.;;
    1)
        git submodule update --init --remote
        #remote is mandatory to avoid detached HEAD du to multiple remote repository
        cd dist
        git checkout master
        #just a security to reattach HEAD in case of problem
        git add -A
        git commit -m "publish: $commit_title generated from commit $commit_hash"
        git push --force heroku master
        
        cd ..
        git add dist
        git commit -m "publish: $commit_title generated from commit $commit_hash"
        cd ..
        ;;
    *)
        echo git diff exited with code $diff. Aborting.
        exit $diff
        ;;
esac
