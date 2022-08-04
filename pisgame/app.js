$.when($.ready).then(function() {

    $("#newGame").click(function() {
        newGame();
        
    });
    $(".tool-build").click(function() {
        $(".tool-box").toggleClass("is-active");
    });
    $(".tool-box .modal-close").click(function() {
        $(".tool-box").removeClass("is-active");
    });
    $(".item-rake").click(function() {
        gameGold += 1000;
    });

    $(".build-item").on({
        mouseenter: function() {


            $(".build-descr").html($(this).attr("aria-descr"));
            $(".build-price").html($(this).attr("aria-price"));
            $(".build-name").html($(this).attr("aria-name"));
            $(".build-detail").show();
        }, 
        mouseleave: function() {
         $(".build-detail").hide();
        },
        click: function() {
            var price = $(this).attr("aria-price");
            if (price > gameGold) {
                gameMsg('<i class="danger">Za mało złota w skarbcu</i>');
            } else {
                gameGold -= price;

            }
        }
    });
});
var pln = new Intl.NumberFormat('pl-pl', {
    style: 'currency',
    currency: 'PLN',
});
var gameClock = 0;
var gameDate = new Date();
var gameGold = 0;
var gameDebt = 0;
var gameEvents = [
    {"price": 5000000, "descr": "zakup polskich flag dla sołtysów "},
{"price": 5500000, "descr": "zakup maseczek przez Szumowskiego od swojego kolegi"},
{"price": 5500000, "descr": "na jacht I LOVE POLAND"},
{"price": 6000000, "descr": "zabezpieczenie miesięcznic smoleńskich"},
{"price": 6500000, "descr": "propagandowy lot Antonova z Chin do Polski "},
{"price": 7000000, "descr": "wypadki z udziałem rządowych limuzyn"},
{"price": 8000000, "descr": "kampania 'Sprawiedliwe sądy'"},
{"price": 9500000, "descr": "straty Stadniny Koni w Janowie Podlaskim"},
{"price": 10000000, "descr": "utrzymanie Instytutu Pokolenia "},
{"price": 12000000, "descr": "antyunijna kampania Towarzystwa Gospodarczego Polskie Elektrownie"},
{"price": 13000000, "descr": "Instytut Europy Środkowej"},
{"price": 13500000, "descr": "150 tys. testów z Korei zniszczonych przez LOT"},
{"price": 14000000, "descr": "nieudany rządowy program budowy promów „Batory”"},
{"price": 20000000, "descr": "Instytut Strat Wojennych im. Jana Karskiego"},
{"price": 20000000, "descr": "zapłaciła PFN amerykańskiej agencji PR za promowanie naszego kraju w USA"},
{"price": 20000000, "descr": "zakup respiratorów od handlarza bronią"},
{"price": 23000000, "descr": "Instytut Współpracy Polsko-Węgierskier"},
{"price": 25000000, "descr": "dotacji z UE dla prowadzonej przez męża Beaty Szydło placówki"},
{"price": 25000000, "descr": "prace Komisji Smoleńskiej"},
{"price": 27000000, "descr": "testy z Turcji od znajomego Macierewicza"},
{"price": 29000000, "descr": "nagrody dla urzędników MSZ Waszczykowskiego"},
{"price": 30000000, "descr": "system e-doręczenia (który nie działa od 2019 r.)"},
{"price": 33000000, "descr": "wydane przez CBA na system do inwigilacji"},
{"price": 33000000, "descr": "utrzymanie Polskiego Instytutu Ekonomicznego"},
{"price": 37000000, "descr": "rządowy Instytut De Republica"},
{"price": 40000000, "descr": "rządowy program kalendarzyka małzenskiego"},
{"price": 50000000, "descr": "dla kościelnej fundacji Fundacja Profeto"},
{"price": 70000000, "descr": "wybory organizowane przez Sasina"},
{"price": 80000000, "descr": "ugoda z francuskim Airbusem za zerwanie kontraktu"},
{"price": 91000000, "descr": "naprawa nowego bloku w elektrowni Jaworzno III"},
{"price": 125000000, "descr": "testy antygenowe koreańskiej firmy PCL"},
{"price": 140000000, "descr": "dotacje dla firmy M. Szumowskiego "},
{"price": 160000000, "descr": "nacjonalizacja Polenergii przez PGE"},
{"price": 243000000, "descr": "Centralnegy Port Komunikacyjny"},
{"price": 300000000, "descr": "reklamy nowego ładu"},
{"price": 250000000, "descr": "dokapitalizowanie ElectroMobility Poland"},
{"price": 258000000, "descr": "projekt Polskie Szwalnie"},
{"price": 308000000, "descr": "polska szczepionka na COVID "},
{"price": 313000000, "descr": "kary za Turów"},
{"price": 325000000, "descr": "projekty i inicjatywy Tadeusza Rydzyka"},
{"price": 400000000, "descr": "Zwiększony budzet KPRM w 2022 r."},
{"price": 500000000, "descr": "dotacja dla Czartoryskich "},
{"price": 585000000, "descr": "dotacja dla Polskiej Fundacji Narodowej"},
{"price": 800000000, "descr": "budowa lotniska w Radomiu "},
{"price": 900000000, "descr": "skutki reformy oświaty z 2016 roku"},
{"price": 1000000000, "descr": "Fundusz Kościelny 2016-2022"},
{"price": 1140000000, "descr": "akcja szczepień przeciwko COVID"},
{"price": 1220000000, "descr": "kary za działalność Izby Dyscyplinarnej SN"},
{"price": 1500000000, "descr": "budowa bloku węglowego w Ostrołęce"},
{"price": 1750000000, "descr": "remont czołgów T-72 "},
{"price": 2000000000, "descr": "przekop Mierzei Wiślanej"},
{"price": 2000000000, "descr": "projekt zabezpieczenia granicy Polsko-Białoruskiej"},
{"price": 2400000000, "descr": "zakup szczepionek przeciw COVID-19"},
{"price": 2500000000, "descr": "zakup 3 samolotów VIP dla Macierewicza"},
{"price": 2500000000, "descr": "odbudowa Pałacu Saskiego "},
{"price": 2800000000, "descr": "dopłaty do górnictwa"},
{"price": 5000000000, "descr": "afera ze SKOKami senatora Biereckiego"},
{"price": 6000000000, "descr": "dofinansowania mediów narodowych"},
{"price": 9000000000, "descr": "koszt nauczania religii "},
{"price": 24000000000, "descr": "spór z UE dot. KPO"},
{"price": 71000000000, "descr": "dodatkowe emerytury"},
{"price": 156000000000, "descr": "Rodzina500+"},

].map(value => ({ value, sort: Math.random() }))
.sort((a, b) => a.sort - b.sort)
.map(({ value }) => value);

var gameBuildings = {
    "church": {"name": "Kościół", "icon": "fa-church", "descr": "Zwiększa szanse reelekcji, ale zwiększa dług", "price": 150000, 
        "ontick": function(){ gameDebt+=1000 }, "count": 0 },

}

var gameMsg = function(text) {
    $("#gameMessageDisplay").prepend(text  + "<br>");
}
var newGame = function() {
    $(".splash-screen").hide();
    $(".game-screen").show();
    gameClock = 1447545600;
    gameDate = new Date(gameClock * 1000);
    startGameClock();
}

var startGameClock = function() {
    setInterval(gameTick, 1000);
}

var gameTick = function(i) {
    gameClock += 86400;
    gameDate = new Date(gameClock * 1000);
    dateFormat = gameDate.toISOString().slice(0,10);


    if(gameGold >= 150000) {
        $("#gameToolset").show();
    }
    


    if( Math.random()*100 <= gameDate.getDay()) {
        var ev = gameEvents.pop();

        gameMsg(dateFormat + "> " + ev["price"]/1000000 + "M: " + ev["descr"]);
        gameDebt += ev["price"];
    }
    $("#gameClockDisplay").html(dateFormat);
    

    $("#gameGoldDisplay").html("PLN: " + pln.format(gameGold) + " | DŁUG: " + pln.format(gameDebt));
    

}