import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { KeyboardAvoidingView } from 'react-native';
import brandImg from '@assets/brand.png';
import { useAuth } from '@hooks/auth';
import { useState } from 'react';
import {
  Brand, Container, Content, ForgotPasswordButton, ForgotPasswordLabel, Title,
} from './styles';

export function SignIn() {
  const { isLogging, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    signIn(email, password);
  }

  return (
    <Container>
      <KeyboardAvoidingView>
        <Content>
          <Brand source={brandImg} />

          <Title>Login</Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            isLoading={isLogging}
            onPress={handleSignIn}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
