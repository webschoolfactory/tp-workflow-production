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
    var innovationSchema = new mongoose.Schema(
    {
        url: String,
        description:  { type: String, index :true },
        title :  { type: String, index :true },
        meta: {
            createdAt: {
                type: Date,
                'default': Date.now
            },
            updatedAt: {
                type: Date,
                'default': Date.now
            }
        },
        user_id : { type : mongoose.Schema.Types.ObjectId, index: true }
    });

    innovationSchema.pre('save', function (next) {
        var innovation = this;
        if (innovation.isNew) {
            innovation.createdAt = undefined;
        } else {
            innovation.updatedAt = Date.now;
        }
        next();
    });

    module.exports = mongoose.model('innovation', innovationSchema);

    


}());