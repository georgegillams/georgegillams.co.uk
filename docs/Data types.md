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

| name               | type   | source | description                                  |
| ------------------ | ------ | ------ | -------------------------------------------- |
| title              | string | stored |                                              |
| author             | string | stored |                                              |
| bookImage          | string | stored |                                              |
| status             | string | stored | One of 'toRead', 'currentlyReading', 'using' |
| recommendation     | number | stored | Out of 10                                    |
| recommendationText | string | stored |                                              |
| amazonLink         | string | stored | Can be affiliate link                        |
| audibleLink        | string | stored |                                              |

## Support

db key: `support`

| name        | type   | source | description |
| ----------- | ------ | ------ | ----------- |
| name        | string | stored |             |
| description | string | stored |             |
| url         | string | stored |             |
