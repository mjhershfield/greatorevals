<script lang="ts">
    import { Title } from "@svelteuidev/core";
</script>

<div class="p-4">
<Title order={2}>How to use GreatorEvals</Title>
<br>
<ol class=" list-decimal">
    <li>
        Use the dropdown boxes in the left panel to select what you would like to compare: department, 
        courses, or professors.
    </li>
    <li>
        Underneath those dropdowns, you can create a filter so that only evaluations that match your 
        filter are displayed. You can filter by department, course, course level, professor, term, and
        specific evaluation questions. An empty filter means that every item is allowed, and a filter
        with any items selected only allows items that match the filter. You can remove a selected item
        from the filter by clicking on its dark blue button so that it disappears. Click the "Filter"
        button to apply your filter.
    </li>
    <li>
        GreatorEvals only shows the top 30 items matching your filters. At the moment, there is no way
        to view any additional items.
    </li>
    <li>
        If you want to play with the innards of GreatorEvals, you can click the code icon in the top
        right to view the developer information. This lets you choose the sorting algorithm used to
        prepare data for viewing and shows the amount of time used in each step of the data processing.
    </li>
    <li>
        For more info and a demonstration of GreatorEvals in action, you can watch my 
        <a href="https://youtu.be/CoIm5-eQIVY" class=" text-blue-600 underline">YouTube video</a>.
    </li>
</ol>
<br>
<Title order={2}>About GreatorEvals</Title>
<br>
<p>
    GreatorEvals uses the public GatorEvals results from Fall 2018-Fall 2021 as its data to display. 
    It was created by Matthew Hershfield as a final project for COP3530, Data Structures and Algorithms.
    You can view the source code for this website and the data scraping strategy on 
    <a href="https://github.com/mjhershfield/greatorevals" class=" text-blue-600 underline">Github</a>.
    If there's enough interest, I'll update this to include the recently released Spring 2022 evals.
    It'll take a significant rework of my scraping strategy though, as scraping all of the data for this
    iteration took about 48 hours and I really don't want to go through that again. If any UF faculty 
    in charge of the data sees this, I'd love to team up and get the raw data.
</p>
<br>
<p>
    If you would like the raw data used to create this website, it can be downloaded from my Github repo
    <a href="https://raw.githubusercontent.com/mjhershfield/greatorevals/main/data-processing/final_data.csv" class=" text-blue-600 underline">here.</a> 
    Keep in mind, you'll need the mappings provided in src/lib/mappings.ts or generated in data-processing/scraper.ipynb 
    to decode the data.
</p>
<p>
    Go Gators! 🐊
</p>
</div>