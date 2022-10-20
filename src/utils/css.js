const CSS = {
  import: url => `@import url('${url}');`,
  style: (name, value) => `${name}:${value};`,
  tag: (name, styles) => `${name} {${styles.join('')}}`,
}

export default CSS;