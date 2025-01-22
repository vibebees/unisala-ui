## to update the cache on new post
    First check the payload i.e variable on feedv2 fetch.
    you have to include everything in the first call.


    {
        "feedQuery": {
            "feedType": "newsfeed",
            "feedId": null,
            "page": 0
        }
    }


## adding more field on payload feedv2
so i were to add a post, i need to mention exactly this variable to update the cache in gql. even if i only add 1 more key

    {
        "feedQuery": {
            "feedType": "newsfeed",
            "feedId": null,
            "page": 0,
            "filterByTags":['review']
        }
    }

if i add a key filterByTags, then i will need to update the cache when the post is added.

to update the cache we need to update:

    1. updateCacheForNewPost
