import mongoose, { Schema } from "mongoose";

const reviewsSchema = new Schema(
  {
    review_for_email: {
      type: String
    },
    reviewer_email: {
      type: String
    },
    review_text: {
      type: String
    },
    is_complete: {
      type: String
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

reviewsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      review_for_email: this.review_for_email,
      reviewer_email: this.reviewer_email,
      review_text: this.review_text,
      is_complete: this.is_complete,
      reviewee: this.reviewee,
      reviewer: this.reviewer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const autoPopulate = function(next) {
  this.populate("reviewee");
  this.populate("reviewer");
  next();
};

reviewsSchema.pre("findOne", autoPopulate).pre("find", autoPopulate);

const model = mongoose.model("Reviews", reviewsSchema);

export const schema = model.schema;
export default model;
