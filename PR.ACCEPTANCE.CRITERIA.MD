# Pull Request Acceptance Criteria

### Local Storage Access

- **Rule**: Do not access local storage directly.
- ❌ **Incorrect**:
  ```javascript
  localStorage.set(item);
  localStorage.get(item);
### State Management

- **Rule**: use utils>cache>apis
  getCache
  setCache
  removeCache


 # Code Organization and Configuration

### Component Modularity

- **Rule**: Code should be well-organized into modules or functions.

    - ❌ **Incorrect**: All logic, state management, and component rendering are in a single component.
    ```javascript
    const App = () => {
      // Bad Approach: All logic here...
    }
    ```

    - ✅ **Correct**: Use helper functions, custom hooks, or separate components.
    ```javascript
    const App = () => {
      const {functions, vars, and other helper components} = appProps();
    }
    ```


### DRY Principle

- **Rule**: Don't Repeat Yourself. Reuse logic and components whenever possible.

### Single Responsibility Principle

- **Rule**: Each component or function should do one thing and do it well.

- **Example of modularized code**:


        const App = () => {

        const allProps = appProps(),
            {accessToken, refreshToken, width, setActiveNavDrop, activeNavDrop, setCreateAPostPopUp, dispatch} = allProps

        useEffect(() => {
            if (accessToken) {
            const decode = jwtDecode(accessToken)
            dispatch(getUserProfile({user: {...decode}, loggedIn: Boolean(decode)}))
            }
        }, [refreshToken, accessToken])
        return ( <IonPage>
                <IonReactRouter>
                    {width >= 768 && (<DesktopView allProps={allProps} />)}
                    {width < 768 && (<MobileView setCreateAPostPopUp={setCreateAPostPopUp} />)}
                </IonReactRouter>
                </IonPage>
            )
        }



