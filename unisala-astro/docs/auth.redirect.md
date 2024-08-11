
# how to redirect user.


1. Thread => login => welcome-form => Thread
    a. if user is not authenticated yet and wants to comment to thread
    we attach the redirect url


      onClick={() => {
   
          const currentUrl = window.location.pathname + window.location.search
          window.location.href = `/auth?redirect=${encodeURIComponent(currentUrl)}`
        }}


### client side:
Utils>lib>URLupdate has navigator
if anything is passed to this funtion, it will put the passed url on priorirty

the state of url to redirect must be maintained all the time
/auth?redirect=new-story

navigator('/welcome-form/step-one')   
navigator('/welcome-form/step-two')
navigator('/welcome-form/step-three')

once, the welcome form is submitted, just call the default funtion without param

navigator('')
finally will execute the redirect 
?redirect=new-story
and takes user to the new-story page with login state


now, this will execute the 






### Server side
<a id ="#'>
<button><button/>
</a>


  <script>
    // Get the current URL
    const currentUrl = new URL(window.location.href);
    
    // Get the redirect parameter
    const redirect = currentUrl.searchParams.get('redirect');
    
    // Get the link element
    const link = document.getElementById('getStartedLink') as HTMLAnchorElement;
    
    if (link && redirect) {
      // Append the redirect to the existing href
      link.href = `${link?.href}?redirect=${encodeURIComponent(redirect)}`;
    }
  </script>