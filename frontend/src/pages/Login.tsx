import {Button, Checkbox, Input, Space, Text} from "@jundao/design";
import {createSignal} from "solid-js";
// import {useNavigate} from "solid-start";
import {supabaseClient} from "../supabase";
// import "./index.scss";
import {useGlobalContext} from "../index";

const LoginPage = () => {
    const [session, setSession] = useGlobalContext().session;
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [showPassword, setShowPassword] = createSignal(false);
    const [invalid, setInvalid] = createSignal(false);

    // const navigate = useNavigate();

    const signInWithEmail = async () => {
        const {data, error} = await supabaseClient.auth.signInWithPassword({
            email: email(),
            password: password(),
        });

        if (error) {
            console.error("Error signing in:", error.message);
            setInvalid(true);
        } else {
            console.log("Successfully signed in:", data);
            setSession(data.session);
            window.location.reload();
        }
    };

    // if (session()) navigate("/");

    return (
        <Space vertical>
            <Text>Connexion</Text>
            <Input
                style="min-width: 10.75rem"
                type="email"
                invalid={invalid()}
                value={email()}
                onChange={(email) => {
                    !setInvalid();
                    setEmail(email);
                }}
                placeholder="Entrez votre email"
                required
            />
            <Input
                style="min-width: 10.75rem"
                type={showPassword() ? "" : "password"}
                invalid={invalid()}
                errorMessage="Email ou mot de passe invalide"
                value={password()}
                onChange={(password) => {
                    !setInvalid();
                    setPassword(password);
                }}
                placeholder="Entrez votre mot de passe"
                required
            />
            <Checkbox
                size="small"
                label="Montrer le mot de passe"
                onChange={() => setShowPassword((psw) => !psw)}
            />
            <Button type="primary" onClick={() => signInWithEmail()}>
                Se connecter
            </Button>
        </Space>
    );
};

export default LoginPage;