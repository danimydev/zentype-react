function tag(content, tag) {
  return `<${tag}>${content}</${tag}>`;
}

function buildCustomTag(customTag) {
  return content => tag(content, customTag);
}

const TAGS = [
  'html',
  'body',
  'header',
  'main',
  'foooter',
  'h1',
  'article',
  'style',
];

const HTML = {
  DOCTYPE: content => {
    return `<!DOCTYPE html>${content}`
  }
};

for (let i = 0; i < TAGS.length; i++) {
  const tag = TAGS[i];
  HTML[tag] = buildCustomTag(tag);
}

export default HTML;