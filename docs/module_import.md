# Use quiztest as a ES6 Module

Quiztest can be imported into other projects. First install with:

```
npm install quiztest
```

And use it in your code to create a quiz app:


```typescript
import { createApp } from 'quiztest'


let node = document.querySelector('.quiztest');
                   
let config = {
    'locale': 'de',
    'shuffleAnswers': false
}

let rawQuiztest = `

# This is awesome!

- [x] True
- [ ] False
`

createApp(rawQuiztest, node, config)
```
