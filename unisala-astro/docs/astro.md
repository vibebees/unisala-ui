#load page to different screen

data-astro-reload

                           <a
                                    href={`/threads/${article._id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleThreadClick(article._id);
                                    }}
                                    data-astro-reload
                                >
                                    {similarThreadHeading(article?.postText)}
                                </a>