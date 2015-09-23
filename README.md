# changeify
Create a change log for an npm project based on structured commit messages.

## How it works

Tag all your commit messages with either `breaking`, `add`, `fix` or `doc` and then before a release run `changeify`. Changeify will:

 1. Generate a changelog separated into the different sections
 2. Commit the changelog
 3. Bump the version based on the type of changes made since the last release (optional)
 4. Publish to npm (optional)
 5. Push to origin (optional)

Example commit message:

> Change signature of function foo
>
> [breaking]
>
> The argument order was swithed because the new one is superior...

The tag "[breaking]" is case insensitive and can be placed anywhere in the commit message
except for the header.
The header is what will be included in the changelog. Look at the changelog
of this project for an example.

All commits without any tags will be ignored when generating the change log and determening the new version.

## Usage
Either install the module globally and use it in any project or install it locally and add it as an npm script.

Run `changeify -n` for a dry run which will print the changelog and the next version to the console.

Run `changeify` to perform steps 1 and 2 mentioned above. Add flag `-p --publish` to also perform steps 3-5.
