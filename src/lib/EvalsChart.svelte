<script>
    import 'charts.css'
</script>

<main class=" max-w-lg mx-auto my-2">
    <table class="charts-css bar hide-data show-data-on-hover show-heading show-labels show-primary-axis show-5-secondary-axes multiple stacked data-spacing-5">
<!-- TODO add tooltips and svelte logic -->
        <caption>Sample GatorEvals Chart</caption>

        <thead>
            <tr>
                <th scope="col">Question</th>
                <th scope="col">1</th>
                <th scope="col">2</th>
                <th scope="col">3</th>
                <th scope="col">4</th>
                <th scope="col">5</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <th scope="row" class="min-w-fit">Question 1</th>
                <td style="--size: 0.1;"><span class="data">0.1</span></td>
                <td style="--size: 0.1;"><span class="data">0.1</span></td>
                <td style="--size: 0.2;"><span class="data">0.2</span></td>
                <td style="--size: 0.3;"><span class="data">0.3</span></td>
                <td style="--size: 0.3;"><span class="data">0.3</span></td>
            </tr>

            <tr>
                <th scope="row" class="min-w-fit">Question 2</th>
                <td style="--size: 0.2;"><span class="data">0.2</span></td>
                <td style="--size: 0.1;"><span class="data">0.1</span></td>
                <td style="--size: 0.3;"><span class="data">0.3</span></td>
                <td style="--size: 0.1;"><span class="data">0.1</span></td>
                <td style="--size: 0.3;"><span class="data">0.3</span></td>
            </tr>
        </tbody>
    </table>
</main>