# Hercules

A code reviewer that allows reviewers to interact with a debuggable instance.

## Description

Just as a hero is only as good as his weapon, our code is only as good as the code review process it undergoes.
Hercules allows users to routes reviewers to an instance of their application run on local.
Reviewers can then interact with the application in the same way users would!

## Features

### 1. Public Instance of Application

By accessing a URL, reviewers interact with the web application in the way users do! This is much better than screenshots for reviewing front end related changes.

This works by using the reviewee would manage their local instance, and use Hercules to route traffic to their localhost.

### 2. Reviewers can set breakpoints and step through code

Not only is the reviewee running their own local instance, but Hercules will attach a remote debugger to their server-side logic and allow reviewers to set breakpoints and step through the code.

### 3. Reviewers can comment on code AND on experience

Since reviewers will be interacting with the application in the same way users do, Hercules will allow them to comment directly on the experience. For example, if there is an image that looks slightly off, they will be able to use Hercules to comment directly on that image.

### 4. Integration with Github

All comments made through Hercules will be integrated with GitHub, maintaining a single source of truth of code reviewer. Hercules will not replace GitHub PRs, only seek to improve the process.
