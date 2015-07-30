1d_plots
========

html files
----------
### 1d_plots_v2.html

`var plots = [];` should not be removed as it is the container for all plots displayed on the page.

There must be an anchor (a String) that is a unique identifier for each plot, menu, and console. For example, `var anchor = graph` or `var anchor2 = graph2`.

`var plot_options = {}` contains predetermined options before the plot loads. Each variable name should be unique, for example `var plot_options = {}` or `var plot_options2 = {}`

Assign the data to `var raw_data`.

`name` is the name of the instrument and the run number.

To generate the plots, create a `new Plot_1d` object and push to the `plots` container.
```
var plot = new Plot_1d(raw_data, anchor, plot_options, name);
plots.push(plot);
var plot2 = new Plot_1d(raw_data, anchor2, plot_options2, name);
plots.push(plot2);
```

In the html, refer to the anchor name in the div classes like so:

`<div class="` [anchor] ` main">`  
`<div class='` [anchor] ` cssmenu'></div>`  
`<div class="` [anchor] `" id="` [anchor] `"></div>`  
`<div class="` [anchor] ` user-console"></div>`  
`</div>`  

For example,
```
<div class="graph main">
  <div class='graph cssmenu'></div>
  <div class="graph" id="graph"></div>
  <div class="graph user-console"></div>
</div>
<div class="graph2 main">
  <div class='graph2 cssmenu'></div>
  <div class="graph2" id="graph2"></div>
  <div class="graph2 user-console"></div>
</div>
```

Region boundaries are stored in the `plots[i].data_region.info_table[j]` dictionary, specifically in `plots[i].data_region.info_table[j].left` and `plots[i].data_region.info_table[j].right` where `i` is the index of the plot and `j` is the index of the region of the plot.

`plot_options` contain the following predetermined options in a dictionary:
```
color: String (hex color code),
log_scale_x: Boolean,
log_scale_y: Boolean,
grid: Boolean,
x_label: String,
y_label: String,
title: String,
x_label_align: String,
y_label_align: String,
title_label_align: String,
allow_region_mode: Boolean,
predetermined_region: Array
```

js files
--------
### 1d_plots_v2.js
- Class Plot_1d:

  - `this.need_error_bars()`  
    Check to see if raw_data has 3 columns; if it does, an error is provided and data_error_bars flags for error bars to be drawn

  - `this.get_scale(log_scale_x, log_scale_y)`  
    Get log scale flags from plot_options and draw plot scale

  - `this.get_domain()`  
    Get domain of raw_data

  - `formatter(d)`  
    Format values on axes

  - `this.get_axes()`  
    Draw x-axis and y-axis

  - `this.axis_items()`
    Create axis values and tick marks

  - `this.scale_objects()`  
    On zoom action, scale data points and line such that the paths don't become too thick or too thin

  - `this.zm()`  
    Zoom and pan function for data path, point, error bar (if applicable), and grid (if applicable). Then scales objects

  - `this.apply_zooms()`  
    Applies listener on user scroll and calls zm() the zoom function

  - `this.zoom_reset()`  
    Resets zoom to 100% and translates back to origin

  - `this.toggle_grid()`  
    Toggles display of grid

  - `this.create_svg()`  
    Create svg element and add axis items

  - `this.init_brush()`
    Initialize brush variables for region mode

  - `brush()`  
    Handles drawing of region | brushstart: activate region; brush: get and show boundaries in user console, show region; brushend: snap to nearest data point and show in user console, add region in region object called data_region  

  - `nearest_data()`  
    Find nearest data point to snap to (used in region mode)

  - `this.create_clipping()`  
    Create clipping reference for zoom element

  - `this.create_labels()`  
    Create text objects (x-axis, y-axis, title labels)

  - `this.create_data_line()`  
    Interpolate data points to draw line graph

  - `this.create_data_points()`  
    Create data points in graph

  - `this.interactive_points(points)`  
    Make data points interactive by adding a hidden larger circle to detect mouse movements, showing a colored outline on mouseover

  - `this.toggle_pan_and_zoom(pan_flag)`  
    When Pan and Zoom mode is selected, call the zoom function and make sure data values are visible on mouseover

  - `this.enable_brush()`  
    Enable d3 brush for regions mode. Calls `brush()`

  - `this.check_predetermined_regions()`  
    Check if regions are predetermined and Region Mode is allowed

  - `this.clear_brush()`  
    Remove region

  - `this.change_color()`  
    Assign color to plot

  - `this.get_data_values(d)`  
    Get data values on hover event

  - `mouseover(d)`  
    Show data values and outline when mouse neters data point

  - `mousemove(d)`  
    Follow mouse near data point

  - `mouseout(d)`  
    Hide data values and outline when mouse leaves data point

  - `getMousePos(e)`  
    Manually get mouse position for Chrome and Firefox (maybe IE???)


### appfunctions_1d.js
- `$(function())` on document load:
  - `plots[i].add_change_label(label)`  
    Changes labels (x-axis, y-axis, title) of plot object

  - `plots[i].add_console_item(id)`  
    Adds console item (zoom % or region bounds)

  - `plots[i].add_region()`  
    Adds a new region in Select Region mode

  - `plots[i].change_region(region_id)`  
    Changes active region (either when user adds a new region or toggles a different region)

  - `plots[i].remove_region(region_id)`  
    Removes region

  - `plots[i].remove_all_regions()`  
    Removes all regions and go back to Pan and Zoom mode

  - `plots[i].graph_modal(offset, w, h, type)`  
    Creates modal objects

  - `plots[i].graph_sidebar(offset, w, h, type)`  
    Creates sidebar

  - `plots[i].create_backdrop(offset, w, h, type)`  
    Creates backdrop (for modal)

  - `plots[i].create_modal(offset, w, h, type)`  
    Creates modal

  - `plots[i].create_sidebar(offset, w, h, type)`  
    Creates sidebar

  - `plots[i].modal_actions(change_id, modal_id)`  
    Adds functionality to buttons in modal

  - `plots[i].change_label(change_id, modal_id)`  
    Changes labels (x-axis, y-axis, title labels)

  - `plots[i].activate_spectrum()`  
    Makes the color picker interactive

  - `plots[i].export_png()`  
    Saves svg (plot and labels) as PNG file

  - `plots[i].export_svg()`  
    Saves svg (plot and labels) as SVG file

  - `plots[i].export_txt()`
    Saves data as TXT file

- `event_handlers(self, i)`
  - `.modal-heading span`  
    When user clicks on a Cancel button, Close button, or the close X button in a modal, remove the backdrop and modal item

  - `.modal-submit`  
    When user clicks on a Submit button, take the appropriate action (determined by the `modal_actions` function) and remove the backdrop and modal item

  - `.link_add_region`  
    When user clicks on the Add [region] button, call `add_region` function

  - `.link_remove_region`  
    When user clicks on the X button to remove region, call `remove_region` function

  - `.link_remove_all_regions`  
    When user clicks on Remove All button to remove all regions, call `remove_all_regions`

  - `.x_label_modal input, .y_label_modal input, .title_modal input`  
    When user presses the Enter key on the keyboard to change the x-axis, y-axis, or title labels, trigger the Submit button

  - `.log_scale_x`  
    When user clicks on x-axis Log Scale option in submenu, toggle the x-axis scale

  - `.log_scale_y`  
    When user clicks on y-axis Log Scale option in submenu, toggle the y-axis scale

  - `.view_grid`  
    When user clicks on View Grid option in menu, toggle grid in plot

  - `.color_picker`  
    When user clicks on Color option in menu, open color picker

  - `.pan_and_zoom`  
    When user clicks on Pan and Zoom mode, make active Pan and Zoom mode and

  - `.select_region`  
    When user clicks on Select Region mode, make active Select Region mode and initialize the first region, add side panel, and Add Region console item (shows bounds in lower blue bar).

  - `.x_axis_label`  
    When user clicks on x-Axis label in submenu, open modal

  - `.y_axis_label`  
    When user clicks on y-Axis label in submenu, open modal

  - `.title_label`  
    When user clicks on title label in submenu, open modal

  - `.export_png`  
    When user clicks on Export > PNG, export svg as png file. Uses saveSvgAsPng.js

  - `.export_svg`  
    When user clicks on Export > SVG, export svg as svg file. Uses saveSvgAsPng.js

  - `.export_txt`
    When user clicks on Export > TXT, export data as text file.


### mustachetemplates.js
Uses Mustache.js template library

- `plots[i].data_menu`, `plots[i].tplt_menu`  
  Data and Template for menu bar (upper blue bar with Options, Modes, Export, Help)

- `plots[i].data_console_item`, `plots[i].tplt_console_region`, `plots[i].tplt_console_zoom`  
  Data and Template for console bar (lower blue bar, either shows Zoom or Region bounds)

- `plots[i].modal_buttons`, `plots[i].close_button`  
  Templates for modal buttons (Cancel and Submit) and close button

- `plots[i].data_objs`, `plots[i].tplt_backdrop`, `plots[i].tplt_modal`, `plots[i].tplt_sidebar`  
  Data and Template for (dark grey) backdrop, and modal and sidebar windows

- `plots[i].data_x_label`, `plots[i].tplt_x_label`  
  Data and Template for displaying modal to change x-axis label

- `plots[i].data_y_label`, `plots[i].tplt_y_label`  
  Data and Template for displaying modal to change y-axis label

- `plots[i].data_title_label`, `plots[i].tplt_title_label`  
  Data and Template for displaying modal to change title

- `plots[i].data_color_picker`, `plots[i].tplt_color_picker`  
  Data and Template for displaying modal to change color of plot

- `plots[i].data_region`, `plots[i].tplt_region`  
  Data and Template for showing table of regions (in sidebar).  
  Initializes `plots[i].data_region.info_table` which is an array that contains a dictionary for each region X, if there are any. Other functions and event handlers in appfunctions_1d.js and 1d_plots_v2.js will refer to this dictionary.
  ```
  plots[i].data_region.info_table = [
    {
      graph_id: String,
      region_id: String,
      region_name: String,
      region_shortname: String,
      active: Boolean,
      left: Float,
      right: Float,
      delete: Boolean
    }
  ]
  ```

  Each region is uniquely identified by a letter which region_id, region_name, and region_shortname are derived from:  
  i.e. region X  
  `region_id: brush brush_X`  
  `region_name: X`  
  `region_shortname: brush_X`  

- `plots[i].data_topics`, `plots[i].tplt_topics`  
  Data and Template for displaying modal for help topics (currently commented out)

- `plots[i].data_about`, `plots[i].tplt_about`  
  Data and Template for displaying modal for about topic (currently commented out)

css files
---------
### 1d_plots_v2.css
- `.main`
- `.menu`
- `.options`, `.modes`, `.export`
- `.menu_button`
- `.axis path`, `.axis line`
- `text`
- `#y_label`
- `#title`
- `.tick`
- `.grid`
- `.focus`
- `#overlay`
- `#plot_anchor`
- `.extent`
- `.pan`
- `.brush-label`

### appstyles.css

Backdrop
- `.backdrop`

Modal
- `.modal-window`
- `.modal-heading`
- `.modal-heading span`
- `.modal-content`
- `.modal-buttons`

Sidebar
- `.sidebar`
- `.sidebar-heading`
- `.sidebar-heading span`
- `.sidebar-content`
- `.info_table a`
- `#new_row a`

Scrollbar
- `.modal-content::-webkit-scrollbar-track`, `.sidebar-content::-webkit-scrollbar-track`
- `.modal-content::-webkit-scrollbar`, `.sidebar-content::-webkit-scrollbar`
- `.modal-content::-webkit-scrollbar-thumb`, `.sidebar-content::-webkit-scrollbar-thumb`

Other
- `.button`
- `.user-console`
- `.console-item`
- `.console-input`
- `a.icon-link`
- `.fa-align-left`, `.fa-align-center`, `.fa-align-right`
- `.align-active`
- `table.info_table`
- `.info_table th`, `.info_table td`

2d_plots
========

html files
----------
### 2d_plots.html

js files
--------
### 2d_plots_v2.js
- Class Plot_2d:

  - `this.get_scale()`  
    Draw plot scale

  - `this.get_domain()`  
    Get domain of raw_data

  - `this.get_axes()`  
    Draw x-axis and y-axis

  - `this.axis_items()`  
    Create axis values and tick marks

  - `this.create_svg()`  
    Create svg element and add axis items

  - `this.zm()`  
    Zoom and pan function for data pixels

  - `this.apply_zooms()`  
    Applies listener on user scroll and calls zm() the zoom function

  - `this.zoom_reset()`  
    Resets zoom to 100% and translates back to origin

  - `this.create_clipping()`  
    Create clipping reference for zoom element

  - `this.create_pixels()`  
    Scale up the calculated pixel width so that we don't produce visual artifacts

  - `this.data_block()`  
    Input data in the pixels and create the entire block of data

  - `this.create_labels()`  
    Create text objects (x-axis, y-axis, title labels)

  - `this.toggle_pan_and_zoom()`  
    When Pan and Zoom mode is selected, call the zoom function and make sure data values are visible on mouseover

  - `get_color(i, n_max)`  
    Get color for each pixel

  - `this.create_tooltip()`  
    Tooltip obj

  - `this.get_data_values(d)`  
    Get data values on hover event

  - `mouseover(d, s)`  
    Show data values and outline when mouse enters data point

  - `mousemove(d)`  
    Follow mouse near data point

  - `mouseout(d, s)`  
    Hide data values and outline when mouse leaves data point

  - `getMousePos(e)`  
    Manually get mouse position for Chrome and Firefox

### appfunctions_2d.js
- `$(function())` on document load:
  - `plots[i].add_change_label(label)`  
    Changes label (x-axis, y-axis, title) of plot object

  - `plots[i].add_console_item(id)`  
    Adds console item (zoom %)

  - `plots[i].graph_modal(offset, w, h, type)`  
    Creates modal objects

  - `plots[i].create_backdrop(offset, w, h, type)`  
    Creates backdrop (for modal)

  - `plots[i].create_modal(offset, w, h, type)`  
    Creates modal

  - `plots[i].create_sidebar(offset, w, h, type)`  
    Creates sidebar

  - `plots[i].modal_actions(change_id, modal_id)`  
    Adds functionality to buttons in modal

  - `plots[i].change_label()`  
    Changes labels (x-axis, y-axis, title labels)

  - `plots[i].export_png()`  
    Saves svg (plot and labels) as PNG file

  - `plots[i].export_svg()`  
    Saves svg (plot and labels) as SVG file

- `event_handlers(self, i)`
  - `.modal-heading span`  
    When user clicks on a Cancel button, Close button, or the close X button in a modal, remove the backdrop and modal item

  - `.modal-submit`  
    When user clicks on a Submit button, take the appropriate action (determined by the modal_actions function) and remove the backdrop and modal item

  - `.x_label_modal input, .y_label_modal input, .title_modal input`  
    When user presses the Enter key on the keyboard to change the x-axis, y-axis, or title labels, trigger the Submit button

  - `.log_scale`  
    When user presses the Log Scale item in the Options submenu, toggle log scale

  - `.pan_and_zoom`  
    When user clicks on Pan and Zoom mode, make active Pan and Zoom mode

  - `.zoom_100`  
    When user clicks on Zoom 100%, reset plot back to 100% zoom and translate back to origin

  - `.see_values`  
    When user clicks on Select Region mode

  - `.x_axis_label`  
    When user clicks on x-Axis label in submenu, open modal,

  - `.y_axis_label`  
    When user clicks on y-Axis label in submenu, open modal,

  - `.title_label`  
    When user clicks on title labe in submenu, open modal,

  - `.export_png`  
    When user clicks on Export > PNG, export svg as png file. Uses saveSvgAsPng.js

  - `.export_svg`  
    When user clicks on Export > SVG, export svg as svg file. Uses saveSvgAsPng.js

### mustachetemplates.js

css files
---------
### 2d_plots.css
- `.main`
- `.menu`
- `.axis path`, `.axis line`
- `.axis text`, `text`, `.tooltip`
- `.x.axis path`
- `.grid .tick`
- `.grid path`
- `.extent`
- `.pan`

### appfunctions_2d.css
???????
- `.sp-picker-container`

Backdrop
- `.backdrop`

Modal
- `.modal-window`
- `.modal-heading`
- `.modal-heading span`
- `.modal-content`
- `.modal-buttons`
- `.modal-buttons a`

Sccrollbar
- `.modal-content::-webkit-scrollbar-track`, `.sidebar-content::-webkit-scrollbar-track`
- `.modal-content::-webkit-scrollbar`, `.sidebar-content::-webkit-scrollbar`
- `.modal-content::-webkit-scrollbar-thumb`, `.sidebar-content::-webkit-scrollbar-thumb`

Other
- `.button`
- `.button:hover`
- `.user-console`
- `.console-item`
- `.console-input`
- `a.icon-link`
- `.fa-align-left`, `.fa-align-center`, `.fa-align-right`
- `.align-active`
- `.info_table`, `.info_table th`, `.info_table td`
