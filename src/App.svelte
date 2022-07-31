<script lang="ts">
    import { AppShell, Navbar, Header, SvelteUIProvider, Center , Loader, Title, Modal, Button, NativeSelect } from '@svelteuidev/core';
    import { InfoCircled, Code } from "radix-icons-svelte";
    import SearchView from './lib/SearchView.svelte';
    import FilterOptions from "./lib/FilterOptions.svelte";
    import DevInfoView from './lib/DevInfoView.svelte';
import AppInfoView from './lib/AppInfoView.svelte';

    let filter: FilterState;
    let info_opened: boolean = false;
    let dev_opened: boolean = false;
    let dev_info: DevInfo;

    // Whenever the filter is updated in FilterOptions.svelte, update the filtering used by the entire app.
    function filter_data(event: CustomEvent)
    {
        filter = event.detail.filter;
    }

</script>

<SvelteUIProvider>
    <AppShell>
        <Header slot="header" height={60} override={{ p: '$mdPX' }}>
            <div class="grid grid-flow-col justify-between">
                <div class=" grid justify-start">
                    <Button compact class="max-w-fit" on:click={()=>{info_opened = true}}><InfoCircled /></Button>
                </div>
                <div class=" grid justify-center">
                    <div>
                    <Title order={1} color="orange" override={{display: "inline"}}>🐊Greator</Title>
                    <Title order={1} variant="gradient" color="blue" override={{display: "inline"}}>Evals</Title>
                    </div>
                </div>
                <div class=" grid justify-end">
                    <Button compact class="max-w-fit mr-3" on:click={()=>{dev_opened = true;}}><Code /></Button>
                </div>
            </div>
        </Header>
        <Navbar slot="navbar" width={{ base: 300 }} override={{ p: '$xsPX' }}>
            <FilterOptions on:new_filter={filter_data}/>
        </Navbar>
        <slot>
            <!-- Fetch API for getting GatorEvals data is asynchronous, so we need await -->
            {#await fetch("final_data.json")}
                <p>waiting for file to be requested</p>
                <Center><Loader size="xl"/></Center>
            {:then resp} 
                {#await resp.json()}
                    <p>waiting for json parsing</p>
                    <Center><Loader size="xl"/></Center>
                {:then json} 
                    <SearchView data={json} bind:filter bind:dev_info/>
                {/await}
            {/await}
        </slot>
    </AppShell>
    <Modal opened={info_opened} on:close={()=>{info_opened = false}}>
        <AppInfoView />
    </Modal>
    <Modal opened={dev_opened} on:close={()=>{dev_opened = false}}>
        <DevInfoView bind:dev_info />
    </Modal>
</SvelteUIProvider>