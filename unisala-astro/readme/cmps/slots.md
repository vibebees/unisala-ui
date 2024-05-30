The <slot/> element is a placeholder for external html content
allowing you to inject or slot child elements from other files into your component template.

By default child element passed to your cmpt will be rendered in it's slot



Wrapper.astro

---
import Header from './Header.astro'
import Logo from './Logo.astro'
import Footer from './Footer.astro'

const {title} = Astro.props;

---


<div id = "content-wrapper">
    <Header/>
    <Logo/>
    <h1>{title} </h1>
    <slot/>     //children will go here!
    <slot name="after-header"/>
    <slot name="before-header"/>   


    <Footer/>
<div>


and how to call or reference these slot?


<p slot ="after-header"> in the tag itself refence the slot = "name" </p>