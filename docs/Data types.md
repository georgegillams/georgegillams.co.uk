# Custom data types

## Blogs

db key: `blogs`

| name                  | type          | source | description     |
| --------------------- | ------------- | ------ | --------------- |
| title                 | string        | stored |                 |
| tags                  | array<string> | stored |                 |
| blogCardDate          | string        | stored |                 |
| blogBannerColor       | string        | stored | valid css color |
| blogImage             | string        | stored | url to image    |
| light                 | bool          | stored |                 |
| published             | bool          | stored |                 |
| publishedTimestamp    | number        | stored |                 |
| showInBlogsList       | bool          | stored |                 |
| showInTravelBlogsList | bool          | stored |                 |

## Books

db key: `books`

| name               | type   | source | description                                   |
| ------------------ | ------ | ------ | --------------------------------------------- |
| title              | string | stored |                                               |
| author             | string | stored |                                               |
| bookImage          | string | stored |                                               |
| status             | string | stored | One of 'toRead', 'currentlyReading', 'using'  |
| recommendation     | number | stored | Out of 10                                     |
| recommendationText | string | stored |                                               |
| amazonLink         | string | stored | Can be affiliate link                         |
| audibleLink        | string | stored |                                               |
| transformative     | string | stored | One of 'transformative', 'not transformative' |

## Medals

db key: `medals`

| name                | type   | source | description                                                               |
| ------------------- | ------ | ------ | ------------------------------------------------------------------------- |
| section             | string | stored | One of `spartan`, `otherOcr`, `hyrox`, `running`, `treks`, `toughMudder`. |
| year                | string | stored | Display year.                                                             |
| eventDate           | string | stored | Optional ISO `YYYY-MM-DD` for sorting within a section.                   |
| stravaId            | string | stored | Optional Strava activity id.                                              |
| spartanType         | string | stored | When `section` is `spartan`: Spartan medal type enum.                     |
| tmPatchType         | string | stored | When `section` is `toughMudder`: Tough Mudder patch type enum.            |
| title               | string | stored | For `hyrox` and EventPatch sections (`otherOcr`, `running`, `treks`).     |
| background          | string | stored | CSS colour for EventPatch sections.                                       |
| foreground          | string | stored | CSS colour for EventPatch sections.                                       |
| showDarkModeOutline | bool   | stored | Optional, EventPatch sections.                                            |

## Support

db key: `support`

| name        | type   | source | description |
| ----------- | ------ | ------ | ----------- |
| name        | string | stored |             |
| description | string | stored |             |
| url         | string | stored |             |
