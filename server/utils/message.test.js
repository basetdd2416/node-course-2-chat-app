var expect = require('expect');

const { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Jen';
    const text = 'Some message';

    const resp = generateMessage(from, text)

    expect(resp.createdAt).toBeA('number')
    expect(resp).toInclude({ from, text });

  })
})