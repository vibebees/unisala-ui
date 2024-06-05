An astro cmp can define and accept pros
This props are available for cmp template.

Props needs to be destrcutred from the global Astro.props obj.

cmp.astro
---
const {greeting, name} = Astro.props
---

<h2>{greeting}, {name}</h2>


this cmp when imported and rendered in other Astro cmps, layout or pages can pass the props as attributes.


---
import GreetingHeadline from './cmp.astro'
cost name = 'Astro'
---

<h1>Greeting card </h1>
<GreetingHeadline greeting = "hi" name = {name}>
<p> Have a wonderful day!</p>


also these props can be defined with Typescript type interface

interface Props{
    name: string
    greeting?: string
}