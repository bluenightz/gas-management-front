// import assert from 'assert'
const decode = require('jwt-decode');
const assert = require('assert');
const jwt = require('jsonwebtoken');

describe('JWT' , () => {
  it('JWT', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWlnIiwiaWF0IjoxNTM4MDI4ODU2LCJleHAiOjE1MzgxMTUyNTZ9.JuIvM6_wCaGYvL2sjbVluYAwePF1BhV_JZSPmI3AfoU';
    console.log('JWT TEST', decode(token));
    console.log('verify', jwt.verify(token));
  });
});