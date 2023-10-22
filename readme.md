<h1>Vinheria Agnello - projeto final(IOT)</h1>

<p>Este projeto IoT consiste em um protótipo que utiliza um sensor DHT11 e um LDR (Sensor de Luminosidade) para capturar dados ambientais, como temperatura, umidade e luminosidade, em um determinado local. Os dados capturados são enviados e gerenciados por meio da plataforma Fiware, que oferece um conjunto de componentes para facilitar a criação de soluções IoT robustas e escaláveis. Os principais componentes usados neste projeto incluem o Mosquitto, STH Comet e o Orion Context Broker.</p>

<h2>Aqui está uma descrição detalhada de como o projeto funciona:</h2>
<ul>
    <li>Sensor DHT11 e LDR: O sensor DHT11 é responsável por medir a temperatura e umidade do ambiente, enquanto o LDR mede a luminosidade. Ambos os sensores fornecem dados analógicos.</li>
    <li>Placa de Microcontrolador: Um microcontrolador (por exemplo, Arduino, Raspberry Pi) é usado para ler os dados dos sensores DHT11 e LDR e convertê-los em valores digitais. O microcontrolador é responsável por reunir esses dados e transmiti-los para a próxima etapa.</li>
    <li>Protocolo MQTT (Mosquitto): Os dados capturados pelos sensores são enviados usando o protocolo MQTT por meio de um serviço como o Mosquitto. O MQTT é um protocolo de comunicação leve e eficiente, adequado para dispositivos IoT de baixa potência.</li>
    <li>Orion Context Broker: O Orion Context Broker é uma parte fundamental da plataforma Fiware. Ele atua como um repositório central de informações contextuais, permitindo o armazenamento e a consulta dos dados enviados pelos dispositivos IoT. O Orion gerencia entidades e atributos, garantindo uma representação coerente e atualizada dos objetos no sistema.</li>
    <li>STH Comet (STH-Comet): O componente STH Comet (STH-Comet) é usado para armazenar séries temporais de dados no Fiware, o que é importante para a análise de tendências e histórico. Ele permite que os dados sejam armazenados e consultados ao longo do tempo.</li>
    <li>Aplicações de Monitoramento e Análise: Os dados capturados pelos sensores são acessíveis por meio de aplicativos de monitoramento e análise que podem fornecer insights em tempo real sobre as condições do ambiente monitorado. Isso pode incluir painéis de controle, aplicativos móveis ou sistemas de automação.</li>
    <li>Em resumo, esse projeto IoT combina sensores DHT11 e LDR com a plataforma Fiware para coletar, armazenar e analisar dados ambientais em tempo real. Isso permite o monitoramento e controle eficiente de condições ambientais em diversos cenários, como agricultura, automação residencial e industrial, entre outros. O uso de protocolos como MQTT e componentes da Fiware como o Orion Context Broker e STH Comet torna o projeto altamente escalável e adaptável a diferentes aplicações IoT.</li>
</ul>












