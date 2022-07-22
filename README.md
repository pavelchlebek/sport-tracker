## Data from task manager

Getting data from task manager to component done via LocationService using `publisher/subscriber` pattern and javascript `closures`

## After adding `@react-navigation/bottom-tabs` IDE underlined type errors

Solved by adding: `"resolutions": { "@types/react": "17.0.43" }` to `package.json` and running `yarn`

---

### TODOs

1. Add Activity Indicator, use when async operation is executed (eg. waiting for AsyncStorage)

2. Find out more on SQLite, figure out what is more performant and when use it over AsyncStorage

3. ActivityList: add effect feedback effect onPress so the user see that something is happening, add feedback on "deleteIcon" as well
