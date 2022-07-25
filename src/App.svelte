<script lang="ts">
    import { AppShell, Navbar, Header, SvelteUIProvider, Center , Loader, Title, Modal } from '@svelteuidev/core';
    import SearchView from './lib/SearchView.svelte';
    import FilterOptions from "./lib/FilterOptions.svelte";

    let filter: FilterState;


    function filter_data(event: CustomEvent)
    {
        filter = event.detail.filter;
    }
</script>

<SvelteUIProvider>
    <AppShell>
        <Navbar slot="navbar" width={{ base: 300 }} override={{ p: '$xsPX' }}>
            <FilterOptions on:new_filter={filter_data}/>
        </Navbar>
        <Header slot="header" height={60} override={{ p: '$mdPX' }}>
            <Title order={1} color="orange" override={{display: "inline"}}>Greator</Title>
            <Title order={1} variant="gradient" color="blue" override={{display: "inline"}}>Evals</Title>
        </Header>
        <slot>
            {#await fetch("final_data.json")}
                <p>waiting for file to be requested</p>
                <Center><Loader size="xl"/></Center>
            {:then resp} 
                {#await resp.json()}
                    <p>waiting for json parsing</p>
                    <Center><Loader size="xl"/></Center>
                {:then json} 
                    <SearchView data={json} bind:filter />
                {/await}
            {/await}
        </slot>
    </AppShell>
</SvelteUIProvider>