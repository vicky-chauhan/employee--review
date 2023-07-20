import { success, notFound } from "../../services/response/";
import { Reviews } from ".";
import Employee from "./../employee/model";

export const show = ({ params }, res, next) =>
  Reviews.findById(params.id)
    .then(notFound(res))
    .then(reviews => (reviews ? reviews.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Reviews.findById(params.id)
    .then(notFound(res))
    .then(reviews => (reviews ? Object.assign(reviews, body).save() : null))
    .then(reviews => (reviews ? reviews.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Reviews.findById(params.id)
    .then(notFound(res))
    .then(reviews => (reviews ? reviews.remove() : null))
    .then(success(res, 204))
    .catch(next);

export const create = ({ bodymen: { body } }, res, next) =>
  Employee.find({
    email: { $in: [body.review_for_email, body.reviewer_email] }
  })
    .then(notFound(res))
    .then(([reviewer, reviewee]) =>
      reviewee
        ? Object.assign(body, {
            reviewee: reviewee._id,
            reviewer: reviewer._id
          })
        : null
    )
    .then(notFound(res))
    .then(review =>
      review
        ? Reviews.create(review)
            .then(reviews => reviews.view(true))
            .then(success(res, 201))
            .catch(next)
        : notFound(null)
    )
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  let q = query["q_reviewer"] ? {} : query;
  q = query["q_reviewee"] ? {} : q;

  Reviews.count(q)
    .then(count =>
      Reviews.find(q, select, cursor).then(reviews => ({
        count,
        rows: reviews.map(reviews => reviews.view())
      }))
    )
    .then(reviews =>
      query["q_reviewer"]
        ? {
            rows: reviews.rows.filter(
              review => review.reviewer.email === query["q_reviewer"]
            )
          }
        : reviews
    )
    .then(reviews =>
      query["q_reviewee"]
        ? {
            rows: reviews.rows.filter(
              review => review.reviewee.email === query["q_reviewee"]
            )
          }
        : reviews
    )
    .then(reviews => ({ ...reviews, count: reviews.rows.length }))
    .then(success(res))
    .catch(next);
};
