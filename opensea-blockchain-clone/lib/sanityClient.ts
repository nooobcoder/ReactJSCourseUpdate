import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: '89qf4x3p',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: false,
  token:
    'skhAar2fvI9LEWnAY0qBi1sEKfHhLGRCjvb8hsHjXqWYyMnE1aXbea84XyCxU3h37JoGpV0dYA2TbmLRU1duMLyBK4SvjzuFqB1MVop0TcdkzNed09kVZjr3uRxt9Uh1oZjJzZKRqv08WKyraEzV2YWrfMbzz2wY85Q4ZNCabSc9fqyMPfup',
})

export { client }
