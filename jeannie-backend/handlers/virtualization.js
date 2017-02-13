var fs = require('fs');
var limdu = require('limdu');
var natural = require('natural');
var serialize = require('serialization');

function newClassifier() {
    // First, define our base classifier type (a multi-label classifier based on winnow):
    // var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
    //     binaryClassifierType: limdu.classifiers.Winnow.bind(0, {
    //         retrain_count: 10
    //     })
    // });
    var TextClassifier = limdu.classifiers.Bayesian.bind(0, {});

    // Initialize a classifier with the base classifier type and the feature extractor:
    return new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier, normalizer: limdu.features.LowerCaseNormalizer,
        // normalizer: natural.PorterStemmerPt.tokenizeAndStem,
        // function(str) {
        //     limdu.features.LowerCaseNormalizer(natural.PorterStemmerEs.tokenizeAndStem(str))
        // },
        featureExtractor: function(sample, features) {
            var grams = natural.PorterStemmerPt.tokenizeAndStem(sample);
            limdu.features.NGramsFromArray(1, null, grams, features)
        }
        // featureExtractor: limdu.features.NGramsOfWords(1)
    });
}

var intentClassifier = newClassifier();

// Train and test:
intentClassifier.trainBatch(require('./virtualization.learn'));

console.dir(intentClassifier.classify('Crie uma VM RedHat com 8GB de RAM e 32GB de disco. Obrigado'));
console.dir(intentClassifier.classify('Preciso de uma máquina RedHat com 8GB de RAM e 32GB de disco. Grato'));
console.dir(intentClassifier.classify('Preciso de um servidor RedHat com 8GB de RAM e 32GB de disco. Obrigado'));
console.dir(intentClassifier.classify('Solicito criação de um servidor RedHat com 8GB de RAM e 32GB de disco. Grato'));
console.dir(intentClassifier.classify('Solicito snapshot da vrt0117. Obrigado'));
console.dir(intentClassifier.classify('Solicito aumento de disco da vrt0117. Obrigado'));

var intentClassifierString = serialize.toString(intentClassifier, newClassifier);
fs.writeFile('./virtualization.json', intentClassifierString);

// - os intents emitidos serão recebidos pelos resolvedores, que extrairão parâmetros do texto
// |- Acesso/Contas
// |- VM (criar, modificar, apagar, desligar, reiniciar, snapshot, INC)
// |- AD (criar, modificar, INC)
// |- BD (criar, modificar, apagar, desligar, reiniciar, snapshot, INC)
// |- Rede
// |- SAP (criar, modificar, apagar, desligar, reiniciar, snapshot, INC)
// |- WAS/BPM (instalar/atualizar app, reiniciar, INC)
// |- Liberty (criar ambiente, instalar/atualizar app, INC)
// |- Canal RH (INC)
// |- Triagem Humana

// - catálogo de serviços diverso
// - o cliente pede algo, iníciando uma thread (o cliente pode especificar agendamento e hints de solver/equipe)
// - são extraidos intents da thread, considerando texto, perfil do usuário na empresa, históricos de pedidos e conteúdo da cadeia de threads
// - a melhor combinação de intents -> solver é escolhida, estabelecendo um canal de feedback entre eles ({} => triagem-humana)
// - as pessoas que estão registradas como triagem-humana utilizam o mesmo app, recebendo a thread e podendo redirecionar para equipe(*)
// - as pessoas que estão registradas como equipe(*) recebem threads para essa equipe
// - qualquer solver pode disparar novas sub-threads, inclusive triagem e equipe(*)
//
//
// feed(threads) -> triagem-robótica -> feed(unsolved_threads) -> triagem-humana
// - triagem-robótica
// |- regex
// |- https://github.com/erelsgl/limdu#feature-engineering
// - triagem-humana