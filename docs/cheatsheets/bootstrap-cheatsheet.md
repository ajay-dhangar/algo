---
id: bootstrap-cheatsheet
title: Bootstrap Cheatsheet
sidebar_label: Bootstrap Cheatsheet
sidebar_position: 2
description: "A fast, practical Bootstrap reference for responsive layouts, components, and modern web development."
tags: [bootstrap, css, frontend, web-development]
---



This page is a quick reference for Bootstrap patterns that show up constantly in modern web development. If you're just starting out, don't worry — every snippet here is explained with practical examples 😊



## Getting Started

### Bootstrap CDN

```html title="Bootstrap via CDN"

<!DOCTYPE html>

<html>

<head>

&#x20; <meta charset="UTF-8">

&#x20; <meta name="viewport" content="width=device-width, initial-scale=1">



&#x20; <link

&#x20;   href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"

&#x20;   rel="stylesheet">

</head>

<body>



&#x20; <script

&#x20;   src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">

&#x20; </script>



</body>

</html>

```



\---



\## Layout



\### Containers



```html title="Bootstrap containers"

<div class="container">

&#x20; Fixed-width responsive container

</div>



<div class="container-fluid">

&#x20; Full-width container

</div>

```



\### Grid System



```html title="Bootstrap grid"

<div class="container">

&#x20; <div class="row">

&#x20;   <div class="col">Column 1</div>

&#x20;   <div class="col">Column 2</div>

&#x20; </div>

</div>

```



\### Column Sizes



```html title="Column sizing"

<div class="row">

&#x20; <div class="col-4">4 columns</div>

&#x20; <div class="col-8">8 columns</div>

</div>

```



Bootstrap grid uses \*\*12 columns\*\*.



| Class     | Breakpoint |

| --------- | ---------- |

| col-sm-\*  | ≥576px     |

| col-md-\*  | ≥768px     |

| col-lg-\*  | ≥992px     |

| col-xl-\*  | ≥1200px    |

| col-xxl-\* | ≥1400px    |



```html

<div class="col-md-6 col-lg-4">

&#x20; Responsive column

</div>

```



\---



\## Typography



\### Headings



```html title="Headings"

<h1>Heading 1</h1>

<h2>Heading 2</h2>



<p class="h1">Styled as h1</p>

```



\### Display Headings



```html

<h1 class="display-1">Display 1</h1>

<h1 class="display-6">Display 6</h1>

```



\### Text Utilities



```html

<p class="fw-bold">Bold</p>

<p class="fw-light">Light</p>



<p class="text-center">Centered</p>

<p class="text-end">Right aligned</p>



<p class="text-primary">Primary text</p>

<p class="text-danger">Danger text</p>

```



\---



\## Colors



```html title="Background colors"

<div class="bg-primary text-white">Primary</div>

<div class="bg-success text-white">Success</div>

<div class="bg-danger text-white">Danger</div>

<div class="bg-warning">Warning</div>

```



Common color classes:



```text

primary

secondary

success

danger

warning

info

light

dark

```



\---



\## Spacing



\### Margin



```html

<div class="m-3">Margin all sides</div>

<div class="mt-4">Margin top</div>

<div class="mb-2">Margin bottom</div>

<div class="mx-auto">Center horizontally</div>

```



\### Padding



```html

<div class="p-3">Padding all sides</div>

<div class="px-4">Horizontal padding</div>

<div class="py-2">Vertical padding</div>

```



Scale:



```text

0 = 0

1 = 0.25rem

2 = 0.5rem

3 = 1rem

4 = 1.5rem

5 = 3rem

```



\---



\## Flexbox Utilities



```html title="Flexbox"

<div class="d-flex">

&#x20; ...

</div>



<div class="d-flex justify-content-center">

&#x20; ...

</div>



<div class="d-flex align-items-center">

&#x20; ...

</div>

```



Common classes:



```text

justify-content-start

justify-content-center

justify-content-end

justify-content-between



align-items-start

align-items-center

align-items-end

```



\---



\## Buttons



```html title="Buttons"

<button class="btn btn-primary">

&#x20; Primary

</button>



<button class="btn btn-success">

&#x20; Success

</button>



<button class="btn btn-danger">

&#x20; Danger

</button>

```



Outline buttons:



```html

<button class="btn btn-outline-primary">

&#x20; Outline

</button>

```



Button sizes:



```html

<button class="btn btn-primary btn-lg">

&#x20; Large

</button>



<button class="btn btn-primary btn-sm">

&#x20; Small

</button>

```



\---



\## Forms



\### Input Fields



```html

<input

&#x20; type="text"

&#x20; class="form-control"

&#x20; placeholder="Enter text">

```



\### Select Menu



```html

<select class="form-select">

&#x20; <option>Option 1</option>

</select>

```



\### Checkbox



```html

<div class="form-check">

&#x20; <input

&#x20;   class="form-check-input"

&#x20;   type="checkbox">



&#x20; <label class="form-check-label">

&#x20;   Remember me

&#x20; </label>

</div>

```



\### Form Layout



```html

<div class="mb-3">

&#x20; <label class="form-label">

&#x20;   Email

&#x20; </label>



&#x20; <input

&#x20;   type="email"

&#x20;   class="form-control">

</div>

```



\---



\## Cards



```html title="Card component"

<div class="card" style="width: 18rem;">

&#x20; <div class="card-body">

&#x20;   <h5 class="card-title">

&#x20;     Card Title

&#x20;   </h5>



&#x20;   <p class="card-text">

&#x20;     Card content

&#x20;   </p>



&#x20;   <a href="#" class="btn btn-primary">

&#x20;     Action

&#x20;   </a>

&#x20; </div>

</div>

```



\---



\## Alerts



```html title="Alerts"

<div class="alert alert-success">

&#x20; Success message

</div>



<div class="alert alert-danger">

&#x20; Error message

</div>

```



\---



\## Badges



```html title="Badges"

<span class="badge bg-primary">

&#x20; New

</span>



<span class="badge bg-danger">

&#x20; 99+

</span>

```



\---



\## Navigation



\### Navbar



```html title="Navbar"

<nav class="navbar navbar-expand-lg navbar-light bg-light">

&#x20; <div class="container">

&#x20;   <a class="navbar-brand" href="#">

&#x20;     Brand

&#x20;   </a>

&#x20; </div>

</nav>

```



\---



\## Tables



```html title="Tables"

<table class="table">

&#x20; <thead>

&#x20;   <tr>

&#x20;     <th>Name</th>

&#x20;     <th>Age</th>

&#x20;   </tr>

&#x20; </thead>



&#x20; <tbody>

&#x20;   <tr>

&#x20;     <td>John</td>

&#x20;     <td>25</td>

&#x20;   </tr>

&#x20; </tbody>

</table>

```



Useful table classes:



```html

table-striped

table-bordered

table-hover

table-dark

```



\---



\## Images



```html title="Responsive images"

<img

&#x20; src="image.jpg"

&#x20; class="img-fluid"

&#x20; alt="Responsive image">

```



Rounded image:



```html

<img class="rounded">

```



Circle image:



```html

<img class="rounded-circle">

```



\---



\## Modal



```html title="Modal trigger"

<button

&#x20; class="btn btn-primary"

&#x20; data-bs-toggle="modal"

&#x20; data-bs-target="#exampleModal">



&#x20; Open Modal

</button>

```



\---



\## Collapse



```html title="Collapse component"

<button

&#x20; class="btn btn-primary"

&#x20; data-bs-toggle="collapse"

&#x20; data-bs-target="#content">



&#x20; Toggle

</button>



<div id="content" class="collapse">

&#x20; Hidden content

</div>

```



\---



\## Utility Classes



\### Display



```html

d-none

d-block

d-inline

d-inline-block

d-flex

```



\### Width



```html

w-25

w-50

w-75

w-100

```



\### Height



```html

h-25

h-50

h-75

h-100

```



\### Borders



```html

border

border-top

border-bottom



rounded

rounded-pill

rounded-circle

```



\### Shadows



```html

shadow-sm

shadow

shadow-lg

```



\---



\## Responsive Helpers



Hide on mobile:



```html

<div class="d-none d-md-block">

&#x20; Visible on md+

</div>

```



Show only on mobile:



```html

<div class="d-block d-md-none">

&#x20; Mobile only

</div>

```



\---



\## Common Layout Patterns



\### Center Everything



```html

<div class="d-flex justify-content-center align-items-center vh-100">

&#x20; Centered Content

</div>

```



\### Responsive Two Column Layout



```html

<div class="row">

&#x20; <div class="col-md-6">

&#x20;   Left

&#x20; </div>



&#x20; <div class="col-md-6">

&#x20;   Right

&#x20; </div>

</div>

```



\### Card Grid



```html

<div class="row g-4">

&#x20; <div class="col-md-4">

&#x20;   <div class="card">

&#x20;     ...

&#x20;   </div>

&#x20; </div>

</div>

```



\---



\## Bootstrap Icons



```html

<link

&#x20;rel="stylesheet"

&#x20;href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">



<i class="bi bi-house"></i>

<i class="bi bi-search"></i>

<i class="bi bi-person"></i>

```



\---



\## Common Errors and Best Practices



```html

<!-- Always include viewport -->

<meta name="viewport"

&#x20;     content="width=device-width, initial-scale=1">



<!-- Use container for layouts -->

<div class="container"></div>



<!-- Prefer Bootstrap spacing utilities -->

<div class="mt-3 mb-4"></div>



<!-- Use responsive grid classes -->

<div class="col-md-6 col-lg-4"></div>



<!-- Avoid excessive custom CSS when Bootstrap utilities exist -->

```



\### Best Practices



\* Use the grid system instead of manual widths.

\* Prefer utility classes (`mt-3`, `d-flex`, `text-center`) over custom CSS when possible.

\* Make layouts mobile-first.

\* Use Bootstrap components before reinventing common UI elements.

\* Keep custom CSS organized and minimal.



\---



\## References



\* https://getbootstrap.com

\* https://icons.getbootstrap.com

\* https://getbootstrap.com/docs/5.3/utilities



