const { test, expect } = require('@jest/globals')
const { normalizeUrl,getURLsFromHTML } = require('./helper.js')


test("normalizeUrl url 1",()=>{
    expect(normalizeUrl("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test("normalizeUrl url 2",()=>{
    expect(normalizeUrl("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test("normalizeUrl url 2",()=>{
    expect(normalizeUrl("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test("normalizeUrl url 4",()=>{
    expect(normalizeUrl("http://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})
test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})
