


Astro uses code fence (---) to identify comooennt script in astro component

we can use the component script to write any js code that need to render template.

which can be used for:

1. importing astro component
2. importing other component like react
3. import json file
4. fetch content from api or db
5. creating variables to reference in template.


---
import SomeAstroComponent from '../components/SomeAstroComponent.astro';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// Access passed-in component props, like `<X title="Hello, World" />`
const { title } = Astro.props;
// Fetch external data, even from a private API or database
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- Your template here! -->