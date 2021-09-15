class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  getClosestElement(selector) {
    return $(this.$el.closest(selector))
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  text(text) {
    this.$el.textContent = text
    return this
  }

  focusDom() {
    this.$el.focus()
    return this
  }

  editStyle(cssStyle, value) {
    this.$el.style[cssStyle] = value
    return this.$el
  }

  addClass(className) {
    return this.$el.classList.add(className)
  }

  removeClass(className) {
    return this.$el.classList.remove(className)
  }

  css(styles = {}) {
    //============FOR IN ЛУЧШЕ НЕ ЮЗАТЬ=============
    // птому, что может доставать свойста прототипа
    // for (const key in styles) {
    //   if (styles.hasOwnProperty(key)) {
    //     this.$el.style[key] = styles[key]
    //   }
    // }

    Object.keys(styles).forEach((key) => (this.$el.style[key] = styles[key]))

    // ПЕРЕДАЛ КОНТЕКСТ В ФУНКЦИЮ-КОЛЛБЭК
    // Object.keys(styles).forEach(
    //   function (key) {
    //     this.$el.style[key] = styles[key]
    //   }.bind(this)
    // )

    return this
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
