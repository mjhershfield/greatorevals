<script lang="ts">
    import { AppShell, Navbar, Header, SvelteUIProvider, Center , Loader, Title, TypographyProvider } from '@svelteuidev/core';
    import SearchView from './lib/SearchView.svelte';
    import FilterOptions from "./lib/FilterOptions.svelte";


    function filter_data(event: CustomEvent)
    {
        alert("Filter Applied:" + JSON.stringify(event.detail.filter));
    }

</script>

<SvelteUIProvider>
    <AppShell>
        <Navbar slot="navbar" width={{ base: 300 }} override={{ p: '$xsPX' }}>
            <FilterOptions on:new_filter={filter_data}/>
        </Navbar>
        <Header slot="header" height={60} override={{ p: '$mdPX' }}>
            <Title order={1} color="blue">GREATOREVALS</Title>
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
                    <SearchView data={json} />
                {/await}
            {/await}
        </slot>
    </AppShell>
</SvelteUIProvider>