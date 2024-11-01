# What does this do?

If you are using [Changesets](@changesets/cli) package to track changes in the
monorepo with multiple projects, then you, maybe would also need the list of the
changed projects. For example to use in the pipelines to do something with changed
packages. 
Then this utility can be handy. It going to changeset folder, parse all `.md` files
and output list of projects that mentioned there.

# How to use it?

Execute:

```
npx get-packages-from-changeset
npx get-packages-from-changeset .changeset-folder -f json
```

Where: 

- .changeset-folder - Folder that contains changeset files. Default value: `.changeset`.
- -f, --format json | text - Format of the output. Supported formats: text and json. Default value: `text`.