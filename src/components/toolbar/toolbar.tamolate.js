function createButton(button) {
  const json = JSON.stringify(button.value)
  return `
    <div class="button ${button.active ? 'active' : ''}" data-type='button' 
    data-value= '${json}'>
      <i class="material-icons"
      data-type='button' 
      data-value= '${json}'> ${button.icon} 
    </i>
    </div>
  `
}

export function createToolbar() {
  const buttons = [
    { icon: 'format_bold', active: false, value: { fontWeight: 'bold' } },
    { icon: 'format_italic', active: false, value: { fontStyle: 'italic' } },
    {
      icon: 'format_underlined',
      active: false,
      value: { textDecoration: 'underline' },
    },
    { icon: 'format_align_left', active: false, value: { textAlign: 'left' } },
    {
      icon: 'format_align_center',
      active: false,
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      active: false,
      value: { textAlign: 'right' },
    },
  ]
  return buttons.map(createButton).join('')
}
