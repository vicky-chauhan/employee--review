import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Reviews } from '.'

const app = () => express(apiRoot, routes)

let reviews

beforeEach(async () => {
  reviews = await Reviews.create({})
})

test('POST /reviews 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ review_for_email: 'test', reviewer_email: 'test', review_text: 'test', is_complete: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.review_for_email).toEqual('test')
  expect(body.reviewer_email).toEqual('test')
  expect(body.review_text).toEqual('test')
  expect(body.is_complete).toEqual('test')
})

test('GET /reviews 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /reviews/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${reviews.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reviews.id)
})

test('GET /reviews/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /reviews/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${reviews.id}`)
    .send({ review_for_email: 'test', reviewer_email: 'test', review_text: 'test', is_complete: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reviews.id)
  expect(body.review_for_email).toEqual('test')
  expect(body.reviewer_email).toEqual('test')
  expect(body.review_text).toEqual('test')
  expect(body.is_complete).toEqual('test')
})

test('PUT /reviews/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ review_for_email: 'test', reviewer_email: 'test', review_text: 'test', is_complete: 'test' })
  expect(status).toBe(404)
})

test('DELETE /reviews/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reviews.id}`)
  expect(status).toBe(204)
})

test('DELETE /reviews/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
