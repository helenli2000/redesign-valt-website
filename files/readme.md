
To add your publication, follow the steps below. If you're super lazy, you can add a publication through GitHub itself just by editing the `pubs.json` file. If you're super awesome, you can clone the repo and upload a preview image, supplemental material, and pdf.

### Adding a Publication (no preview image or PDF)

Follow this format:

    {
      "Category":      "Conference",
      "Key":           "afergan2014dynamic",
      "Author":        "Daniel Afergan, Evan M. Peck, Erin Solovey, Sam Hincks, AJ Jenkins, Eli T. Brown, Remco Chang, Robert Jacob",
      "Title":         "Dynamic Difficulty Using Brain Metrics of Workload",
      "Journal":       "ACM SIGCHI Conference on Human Factors in Computing Systems (CHI)",
      "Year":          "2014"
    },

`Category`: can be `"Conference", "Journal", "Book Chapter", or "Miscellaneous"` (posters and small workshops).

`Key`: should be `last name` + `year` + `first word of publication`.

`Title`: be sure to include capitalization.

`Author`: should be a list of first and last names, followed by a comma.

`Journal`: if we have published there before, look through the publications list to see how the venue should be stated. For example, don't use `ACM CHI`, but rather `ACM SIGCHI Conference on Human Factors in Computing Systems (CHI)`

### Adding a Publication (with preview image, PDF, supplemental material, or award)

Follow the format as before, but note the additional properties: `img` and the `supplemental` array.

    {
      "Category":      "Conference",
      "Key":           "afergan2014dynamic",
      "Author":        "Daniel Afergan, Evan M. Peck, Erin Solovey, Sam Hincks, AJ Jenkins, Eli T. Brown, Remco Chang, Robert Jacob",
      "Title":         "Dynamic Difficulty Using Brain Metrics of Workload",
      "Journal":       "ACM SIGCHI Conference on Human Factors in Computing Systems (CHI)",
      "Year":          "2014",
      "img":           "img/preview/afergan2014dynamic-preview.png",
      "supplemental":  [
        { "name":"pdf", "ref":"pdf/afergan2014dynamic.pdf" },
        { "name": "Best Paper Award Honorable Mention" }
      ]
    },
    
`img`: is the preview image (left of the publication). It should be a PNG format, and 128px wide by 64px tall. To add one, clone the valt-website repo and add the image to the `img/preview` directory.

`supplemental`: is an array. Each entry should have a `name` and (optionally) a `ref` that links to a file. For example, a video could be `{ "name":"video preview", "ref":"http://vimeo.com/102605825" }`.




