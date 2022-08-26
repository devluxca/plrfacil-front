<script>

</script>

<nav>
    <img src="/images/logo-white-small.svg" alt="Logo small" />

    <section class="profile">
        <h2>João Alberto</h2>
        <img class="profile-image" src="/images/default.png" alt="User image" />
    </section>
</nav>

<style>
    nav {
        padding: 0px 50px;
        background: var(--plrfacil-dark);
        height: 64px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .profile {
        display: flex;

    }

    .profile h2 {
        font-family: 'Roboto';
        font-size: 20px;
        font-weight: 600;
        color: var(--plrfacil-white);

        margin-top: 5px;
    }

    .profile-image {
        margin-left: 20px;
        max-width: 50px;
        max-height: 50px;
        border-radius: 100%;
        box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.5);
    }
</style>