//Programa: NodeMCU e MQTT - Controle e Monitoramento IoT
//Autor: Fábio Henrique Cabrini
//Resumo: Esse programa possibilita ligar e desligar o led onboard, além de mandar o status para o Broker MQTT possibilitando o Fiware saber
//se o led está ligado ou desligado.
 
#include <WiFi.h>
#include <PubSubClient.h> // Importa a Biblioteca PubSubClient
#include <DHT.h>
#define DHTPIN 33
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
//defines:
//defines de id mqtt e tópicos para publicação e subscribe denominado TEF(Telemetria e Monitoramento de Equipamentos)
#define TOPICO_SUBSCRIBE "/TEF/vinheria/cmd"     //tópico MQTT de escuta
#define TOPICO_PUBLISH   "/TEF/vinheria/attrs/L"  //tópico MQTT de envio de informações para Broker
#define TOPICO_PUBLISH_2  "/TEF/vinheria/attrs/T" //tópico MQTT de envio de informações para Broker
#define TOPICO_PUBLISH_3  "/TEF/vinheria/attrs/U"
                                                //IMPORTANTE: recomendamos fortemente alterar os nomes
                                                //            desses tópicos. Caso contrário, há grandes
                                                //            chances de você controlar e monitorar o NodeMCU
                                                //            de outra pessoa.
#define ID_MQTT  "fiware_vinheria"     //id mqtt (para identificação de sessão)
                              //IMPORTANTE: este deve ser único no broker (ou seja, 
                              //            se um client MQTT tentar entrar com o mesmo 
                              //            id de outro já conectado ao broker, o broker 
                              //            irá fechar a conexão de um deles).
                                
  
#define ldrPin 32
#define greenLedPin 13
#define yellowLedPin 12
#define redLedPin 14
// WIFI
const char* SSID = "FIAP-IBM"; // SSID / nome da rede WI-FI que deseja se conectar
const char* PASSWORD = "Challenge@23!"; // Senha da rede WI-FI que deseja se conectar
  
// MQTT
const char* BROKER_MQTT = "46.17.108.113"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 1883; // Porta do Broker MQTT
 

//Variáveis e objetos globais
WiFiClient espClient; // Cria o objeto espClient
PubSubClient MQTT(espClient); // Instancia o Cliente MQTT passando o objeto espClient
  
//Prototypes
void initWiFi();
void initMQTT();
void reconectWiFi(); 
void mqtt_callback(char* topic, byte* payload, unsigned int length);
void VerificaConexoesWiFIEMQTT(void);

 
/* 
 *  Implementações das funções
 */
void setup() {    //inicializações:
    pinMode(greenLedPin, OUTPUT);
    pinMode(yellowLedPin, OUTPUT);
    pinMode(redLedPin, OUTPUT);
    Serial.begin(115200);
    initWiFi();
    initMQTT();
    dht.begin();
    pinMode(greenLedPin, OUTPUT);
    pinMode(yellowLedPin, OUTPUT);
    pinMode(redLedPin, OUTPUT);
}
  
//Função: inicializa comunicação serial com baudrate 115200 (para fins de monitorar no terminal serial 
//        o que está acontecendo.
//Parâmetros: nenhum
//Retorno: nenhum

 
//Função: inicializa e conecta-se na rede WI-FI desejada
//Parâmetros: nenhum
//Retorno: nenhum
void initWiFi() {
    delay(10);
    Serial.println("------Conexao WI-FI------");
    Serial.print("Conectando-se na rede: ");
    Serial.println(SSID);
    Serial.println("Aguarde");
     
    reconectWiFi();
}
  
//Função: inicializa parâmetros de conexão MQTT(endereço do 
//        broker, porta e seta função de callback)
//Parâmetros: nenhum
//Retorno: nenhum
void initMQTT() {
    MQTT.setServer(BROKER_MQTT, BROKER_PORT);   //informa qual broker e porta deve ser conectado
    MQTT.setCallback(mqtt_callback);            //atribui função de callback (função chamada quando qualquer informação de um dos tópicos subescritos chega)
}
  
//Função: função de callback 
//        esta função é chamada toda vez que uma informação de 
//        um dos tópicos subescritos chega)
//Parâmetros: nenhum
//Retorno: nenhum
void mqtt_callback(char* topic, byte* payload, unsigned int length) {
    String msg;
 
    //obtem a string do payload recebido
    for(int i = 0; i < length; i++) 
    {
       char c = (char)payload[i];
       msg += c;
    }
   
    //toma ação dependendo da string recebida:
    //verifica se deve colocar nivel alto de tensão na saída D0:
    //IMPORTANTE: o Led já contido na placa é acionado com lógica invertida (ou seja,
    //enviar HIGH para o output faz o Led apagar / enviar LOW faz o Led acender)
}
//Função: reconecta-se ao broker MQTT (caso ainda não esteja conectado ou em caso de a conexão cair)
//        em caso de sucesso na conexão ou reconexão, o subscribe dos tópicos é refeito.
//Parâmetros: nenhum
//Retorno: nenhum
void reconnectMQTT() {
    while (!MQTT.connected()) 
    {
        Serial.print("* Tentando se conectar ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) 
        {
            Serial.println("Conectado com sucesso ao broker MQTT!");
            MQTT.subscribe(TOPICO_SUBSCRIBE); 
        } 
        else
        {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Havera nova tentatica de conexao em 2s");
            delay(2000);
        }
    }
}
  
//Função: reconecta-se ao WiFi
//Parâmetros: nenhum
//Retorno: nenhum
void reconectWiFi() {
    //se já está conectado a rede WI-FI, nada é feito. 
    //Caso contrário, são efetuadas tentativas de conexão
    if (WiFi.status() == WL_CONNECTED)
        return;
         
    WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI
     
    while (WiFi.status() != WL_CONNECTED) {
        delay(100);
        Serial.print(".");
    }
   
    Serial.println();
    Serial.print("Conectado com sucesso na rede ");
    Serial.print(SSID);
    Serial.println("IP obtido: ");
    Serial.println(WiFi.localIP());
}
 
//Função: verifica o estado das conexões WiFI e ao broker MQTT. 
//        Em caso de desconexão (qualquer uma das duas), a conexão
//        é refeita.
//Parâmetros: nenhum
//Retorno: nenhum
void VerificaConexoesWiFIEMQTT(void){
    if (!MQTT.connected()) 
        reconnectMQTT(); //se não há conexão com o Broker, a conexão é refeita
     
     reconectWiFi(); //se não há conexão com o WiFI, a conexão é refeita
}
  
//programa principal
void loop() {   
    char tempBuffer[6];
    char humidityBuffer[6];
    char msgBuffer[6];  // Defina o tamanho adequado para o buffer
    
    VerificaConexoesWiFIEMQTT();
    
    int sensorValue = analogRead(ldrPin);
    float voltage = sensorValue * (3.3 / 4095.0);
    float luminosity = (voltage / 3.3) * 100.0;  // Inverte a lógica


    snprintf(msgBuffer, sizeof(msgBuffer), "%.1f%%", luminosity);
    delay(1000);
    MQTT.publish(TOPICO_PUBLISH, msgBuffer);

    // Leitura da temperatura e umidade
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    // Publicação dos valores de temperatura e umidade nos tópicos MQTT
    if (!isnan(temperature)) {
        dtostrf(temperature, 4, 2, tempBuffer);
        delay(1000);
        MQTT.publish(TOPICO_PUBLISH_2, tempBuffer);
    }

    if (!isnan(humidity)) {
        dtostrf(humidity, 4, 2, humidityBuffer);
        delay(1000);
        MQTT.publish(TOPICO_PUBLISH_3, humidityBuffer);
    }

    // Lógica para controle dos LEDs com base nos valores lidos
    digitalWrite(greenLedPin, LOW);
    digitalWrite(yellowLedPin, LOW);
    digitalWrite(redLedPin, LOW);

    if (luminosity > 30) {
        digitalWrite(greenLedPin, HIGH);
        digitalWrite(yellowLedPin, LOW);
    	  digitalWrite(redLedPin, LOW);
    }
    if (temperature < 20) {
        digitalWrite(greenLedPin, LOW);
        digitalWrite(yellowLedPin, LOW);
    	  digitalWrite(redLedPin, HIGH);
    }
    //  else if (luminosity > 30 && luminosity < 40) {
    //     digitalWrite(greenLedPin, LOW);
    // 	  digitalWrite(yellowLedPin, HIGH);
    // 	  digitalWrite(redLedPin, LOW);
    // } else {
    //     digitalWrite(greenLedPin, LOW);
    // 	  digitalWrite(yellowLedPin, LOW);
    // 	  digitalWrite(redLedPin, HIGH);
    // }

    // if (humidity > 50) {
    //   digitalWrite(greenLedPin, HIGH);
    // 	digitalWrite(yellowLedPin, LOW);
    // 	digitalWrite(redLedPin, LOW);
    // }
    // else{
    //   digitalWrite(greenLedPin, LOW);
    // 	digitalWrite(yellowLedPin, LOW);
    // 	digitalWrite(redLedPin, HIGH);
    // }


    // if (temperature > 20 && temperature < 30) {
    //   digitalWrite(greenLedPin, HIGH);
    // 	digitalWrite(yellowLedPin, LOW);
    // 	digitalWrite(redLedPin, LOW);
    // }  
    // else{
    //   digitalWrite(greenLedPin, LOW);
    // 	digitalWrite(yellowLedPin, LOW);
    // 	digitalWrite(redLedPin, HIGH);
    // }

    MQTT.loop();
}






