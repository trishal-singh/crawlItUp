const { test, expect } = require('@jest/globals')
const { normalizeUrl } = require('./helper.js')


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