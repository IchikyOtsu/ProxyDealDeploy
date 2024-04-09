import { createEffect, createSignal } from 'solid-js/types/server/reactive.js';
import './index.css';

import { A } from "@solidjs/router";

const Navbar = () => {
    return (
        <>
            <A href="/" class="logo">Proxideal</A>

            <nav class="navbar">
                <A href="/adverts" class="active">Adverts<i class='bx bxs-inbox'></i></A>
                <A href="/planning">Planning<i class='bx bxs-calendar'></i></A>
                <A href="/chat">Chat<i class='bx bxs-chat'></i></A>
                <A href="/tracking">Tracking<i class='bx bxs-bar-chart-alt-2'></i></A>
                <A href="/profile">Profile<i class='bx bxs-user'></i></A>
            </nav>
        </>
    );
};

export default Navbar;
