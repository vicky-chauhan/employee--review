import { Reviews } from '.'

let reviews

beforeEach(async () => {
  reviews = await Reviews.create({ review_for_email: 'test', reviewer_email: 'test', review_text: 'test', is_complete: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = reviews.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reviews.id)
    expect(view.review_for_email).toBe(reviews.review_for_email)
    expect(view.reviewer_email).toBe(reviews.reviewer_email)
    expect(view.review_text).toBe(reviews.review_text)
    expect(view.is_complete).toBe(reviews.is_complete)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = reviews.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reviews.id)
    expect(view.review_for_email).toBe(reviews.review_for_email)
    expect(view.reviewer_email).toBe(reviews.reviewer_email)
    expect(view.review_text).toBe(reviews.review_text)
    expect(view.is_complete).toBe(reviews.is_complete)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
