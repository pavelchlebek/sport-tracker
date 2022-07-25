## Data from task manager

Getting data from task manager to component done via LocationService using `publisher/subscriber` pattern and javascript `closures`

## After adding `@react-navigation/bottom-tabs` IDE underlined type errors

Solved by adding: `"resolutions": { "@types/react": "17.0.43" }` to `package.json` and running `yarn`

---

### TODOs

1. Add Activity Indicator, use when async operation is executed (eg. waiting for AsyncStorage)

2. Find out more on SQLite, figure out what is more performant and when use it over AsyncStorage

3. ActivityList: add effect feedback effect onPress so the user see that something is happening, add feedback on "deleteIcon" as well

---

## ActivityListScreen `useEffect`

When loading data from AsyncStorage on the screen, adding `itemsInStorage` as a dependency instead of loading on every render
brought huge distinguishable performance boost

---

### Idea

1. Develop graph component and display Activity track

---

### Location updated in built app

Built app would not start `startLocationUpdatesAsync()`

error message says: `you need to add`: `ACCESS_BACKGROUND_LOCATION` to the `AndroidManifest`
code: `ERR_NO_PERMISSIONS`

Error resolved by adding `"android.permission.ACCESS_BACKGROUND_LOCATION"` to app.json under permission array

To my good surprise app `location updates` work even when app is in `background` which did not work in Expo Go

And now I see that the `location updates` work even when a phone's `display is turned off` (locked)
