const { test, expect } = require('@jest/globals')
const { normalizeUrl } = require('./helper.js')

test("normalizeUrl empty",()=>{
    expect(normalizeUrl("")).toBe("")
})
test("normalizeUrl empty 2",()=>{
    expect(normalizeUrl(" ")).toBe(" ")
})
