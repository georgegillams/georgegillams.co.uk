#! /bin/bash

# Admin user
curl 'http://localhost:3000/api/users/create' -X POST -H 'apiKey: asdfghjkl' -H 'Content-Type: application/json' --data-raw \
'{"requestedId":"admin-user","email":"admin@georgegillams.co.uk","name":"Admin","admin":"true","emailVerified":"true"}'

# Blogs
curl 'http://localhost:3000/api/blogs/create' -X POST -H 'apiKey: asdfghjkl' -H 'Content-Type: application/json' --data-raw \
'{"requestedId":"some-blog-id","title":"Some blog title","published":"true","showInBlogsList":"true","content":"This is some blog writing"}'

# Books
curl 'http://localhost:3000/api/books/create' -X POST -H 'apiKey: asdfghjkl' -H 'Content-Type: application/json' --data-raw \
'{"requestedId":"book-id","title":"Some book title","author":"Fred Smith","status":"toRead","bookImage": "https://www.georgegillams.co.uk/api/images/load/zq9dhw","amazonLink":"https://www.amazon.co.uk/","audibleLink":"https://www.audible.co.uk/"}'

curl 'http://localhost:3000/api/books/create' -X POST -H 'apiKey: asdfghjkl' -H 'Content-Type: application/json' --data-raw \
'{"requestedId":"test-id","title":"Another book title","author":"Long name author with a really-really long name","status":"toRead","bookImage": "https://www.georgegillams.co.uk/api/images/load/zq9dhw","amazonLink":"https://www.amazon.co.uk/","audibleLink":"https://www.audible.co.uk/"}'

curl 'http://localhost:3000/api/books/create' -X POST -H 'apiKey: asdfghjkl' -H 'Content-Type: application/json' --data-raw \
'{"requestedId":"test-id","title":"This book has a really long title which is really hard to fit onto the screen","author":"Another author","status":"currentlyReading""bookImage": "https://www.georgegillams.co.uk/api/images/load/zq9dhw","amazonLink":"https://www.amazon.co.uk/","audibleLink":"https://www.audible.co.uk/"}'

curl 'http://localhost:3000/api/books/create' -X POST -H 'apiKey: asdfghjkl' -H 'Content-Type: application/json' --data-raw \
'{"requestedId":"test-id","title":"The Slight Edge","author":"Slight Edge","status":"using","recommendation":"9","bookImage": "https://www.georgegillams.co.uk/api/images/load/zq9dhw","amazonLink":"https://www.amazon.co.uk/","audibleLink":"https://www.audible.co.uk/"}'