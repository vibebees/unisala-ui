#Act like a single break would crash the app, build like it's going to be alive forever

# Build app on Ios
        ionic capacitor add ios
        npx cap open ios
# Build app on Android
        ionic capacitor add android
        npx cap open android




##  Naming Convention

### File And Folder:
    * files  :  in object structure i.e university.page, university.dashboard
    * folder : lowercase and may include underscores(_) i.e mock_data

## APP START
    npm start


`folder structure`

    |-src
    ├── mock_data
    |---src
    │   ├── mock.data           
    │   ├── theme                  
    │   ├── store 
    |   |   |-- action
    |   |   |-- reducer
    |   |   |-- store.js          
    │   ├── ui              
    |   |   |--components 
    |   |   |--pages              

    each pages should be a folder itself and render from index.js

### Components:
    Each components exported should not be default i.e export each component on it's own name and behaviour

## Server
    ionic serve