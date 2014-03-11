var mongoose = require('mongoose');
/**
 *
 *  Mongoose schemas type available here : http://mongoosejs.com/docs/schematypes.html &
 *  for specials options http://mongoosejs.com/docs/api.html#schema_Schema.Types
 *
 *
 *
var schema = new Schema({
	name:    String,
	binary:  Buffer,
	living:  Boolean,
	updated: { type: Date, default: Date.now }
	age:     { type: Number, min: 18, max: 65 }
	mixed:   Schema.Types.Mixed,
	_someId: Schema.Types.ObjectId,
	array:      [],
	ofString:   [String],
	ofNumber:   [Number],
	ofDates:    [Date],
	ofBuffer:   [Buffer],
	ofBoolean:  [Boolean],
	ofMixed:    [Schema.Types.Mixed],
	ofObjectId: [Schema.Types.ObjectId],
	nested: {
		stuff: { type: String, lowercase: true, trim: true }
	}
})
 *
 *
 */

(function () {
	'use strict';
    var userSchema = new mongoose.Schema(
    {
        displayName: String,
        login:  { type: String, unique: true, index :true },
        password: String,
        name: {
            familyName: String,
            givenName: String
        },
        birthday: Date,
        gender: String,
        drinker: String,
        tags: [String],
        emails: [
            {
                value: String, //TODO : convert to custom type email
                type: { type: String },
                primary: Boolean
            }
        ],
        meta: {
            createdAt: {
                type: Date,
                'default': Date.now
            },
            updatedAt: {
                type: Date,
                'default': Date.now
            }
        }
    });

    userSchema.pre('save', function (next) {
        var user = this;
        if (user.isNew) {
            user.createdAt = undefined;
        } else {
            user.updatedAt = Date.now;
        }
        next();
    });

    module.exports = mongoose.model('user', userSchema);

}());