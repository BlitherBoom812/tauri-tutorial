function gradientText(text:string, font_style:string, from_style:string, to_style:string) {
    return (<svg>
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" className={from_style} />
        <stop offset="100%" className={to_style} />
      </linearGradient>
    </defs>
    <text x="0" y="36" fill="url(#grad)" className={font_style}>
      {text}
    </text>
  </svg>)
}

export {
    gradientText
}