// グローバル状態
let userInputs = {};
let mountainSuggestions = [];
let compareItems = [];

// ===== 山データ =====

const MOUNTAINS_DB = [
    // 関東
    {
        name: "高尾山",
        area: "関東",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "2〜3時間",
        walkTimeMin: 2,
        walkTimeMax: 3,
        feature: "東京から気軽にアクセスできる入門の山。整備された登山道が複数あり初心者でも安心。紅葉・春の桜が美しく観光客も多い。",
        accessTrain: "京王線高尾山口駅から徒歩すぐ。新宿から約50分。",
        accessCar: "中央道八王子ICから約15分。駐車場あり。",
        purposes: ["景色・絶景重視", "周辺観光も楽しみたい", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "春の桜シーズンは大変混雑します。早朝出発がおすすめです。",
            夏: "夏は涼しい時間帯（早朝）の登山をおすすめします。",
            秋: "紅葉シーズン（11月頃）は特に混雑します。平日の利用を検討してください。",
            冬: "冬でも登山道は整備されていますが、凍結に注意。必ず現地情報を確認してください。"
        }
    },
    {
        name: "筑波山",
        area: "関東",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "3〜4時間",
        walkTimeMin: 3,
        walkTimeMax: 4,
        feature: "百名山最東端。男体山・女体山の2峰からなる。ケーブルカー・ロープウェイ併用可能。御幸ヶ原からの眺望が絶景。",
        accessTrain: "つくばエクスプレスつくば駅からバスで約40分。",
        accessCar: "常磐道土浦北ICから約40分。",
        purposes: ["景色・絶景重視", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "春の梅まつり（2〜3月）が有名。花が楽しめる季節です。",
            夏: "山頂は比較的涼しいですが、登山道は暑い。水分をしっかり持参してください。",
            秋: "紅葉が美しい季節。混雑することがあります。",
            冬: "冬は凍結箇所あり。チェーンスパイクを持参するとより安全です。必ず現地情報を確認してください。"
        }
    },
    {
        name: "大山（丹沢）",
        area: "関東",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "3〜5時間",
        walkTimeMin: 3,
        walkTimeMax: 5,
        feature: "関東平野を一望。阿夫利神社がある信仰の山。尾根道から富士山も見える。ケーブルカーで中腹までアクセス可能。",
        accessTrain: "小田急伊勢原駅からバスで約30分。",
        accessCar: "東名高速厚木ICから約30分。",
        purposes: ["景色・絶景重視", "周辺観光も楽しみたい", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "春はケーブルカーが混雑します。余裕を持ったスケジュールを。",
            夏: "夏でも山頂は涼しい。阿夫利神社でのお参りもおすすめです。",
            秋: "紅葉が美しく、ケーブルカーから眺める紅葉が見事です。",
            冬: "冬は積雪がある場合あり。必ず現地情報を確認してください。"
        }
    },
    {
        name: "御岳山（奥多摩）",
        area: "関東",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "2〜4時間",
        walkTimeMin: 2,
        walkTimeMax: 4,
        feature: "ケーブルカー利用可。武蔵御嶽神社を中心に、ロックガーデン・長尾平など多彩なコースが楽しめる。渓流沿いの散策も人気。",
        accessTrain: "JR青梅線御嶽駅からバスでケーブル下まで約10分。",
        accessCar: "圏央道青梅ICから約20分。",
        purposes: ["景色・絶景重視", "周辺観光も楽しみたい", "のんびりゆるハイク"],
        overnightOk: true,
        seasonNotes: {
            春: "春はレンゲショウマや桜が見事。ケーブルカーも賑わいます。",
            夏: "レンゲショウマの群生（7〜8月）が有名。渓流も涼しくおすすめ。",
            秋: "紅葉シーズンが特に美しい。ロックガーデンの紅葉は格別です。",
            冬: "冬は人が少なく静かな山歩きが楽しめます。防寒対策を忘れずに。必ず現地情報を確認してください。"
        }
    },
    {
        name: "陣馬山〜高尾山縦走",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜6時間",
        walkTimeMin: 5,
        walkTimeMax: 6,
        feature: "奥高尾の代表的な縦走コース。陣馬山山頂の白馬像が有名。尾根道が続きアップダウンが多い。複数の茶屋で休憩できる。",
        accessTrain: "JR中央本線藤野駅から陣馬山登山口までバスまたは徒歩。",
        accessCar: "圏央道相模原ICから約30分。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "春は道沿いのスミレや桜が楽しめます。",
            夏: "尾根道は日差しが強いので帽子・水分をしっかり準備してください。",
            秋: "紅葉が美しく縦走がより楽しめる季節です。",
            冬: "冬は凍結箇所あり。アイゼン・チェーンスパイクを持参してください。必ず現地情報を確認してください。"
        }
    },
    {
        name: "雲取山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "1泊2日推奨（日帰りは8〜10時間）",
        walkTimeMin: 8,
        walkTimeMax: 10,
        feature: "東京都最高峰2017m。山頂からの360度パノラマが絶景。鴨沢ルートが一般的。山小屋・避難小屋あり。",
        accessTrain: "JR青梅線奥多摩駅からバスで鴨沢まで約30分。",
        accessCar: "圏央道青梅ICから約1時間（鴨沢駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: true,
        seasonNotes: {
            春: "残雪がある場合があります。アイゼンを持参してください。必ず現地情報を確認してください。",
            夏: "夏は涼しく快適。山小屋の予約を事前に。",
            秋: "紅葉が美しい。山小屋は混雑するので早めの予約を。",
            冬: "雪山になります。冬山装備が必要です。必ず現地情報を確認してください。"
        }
    },
    {
        name: "塔ノ岳（丹沢）",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜7時間",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "丹沢主稜の盟主。富士山・相模湾の絶景が有名。大倉尾根（バカ尾根）は急登で体力が必要。山頂に山小屋あり。",
        accessTrain: "小田急渋沢駅から大倉バス停まで約5分。",
        accessCar: "東名高速秦野中井ICから約20分（大倉駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: true,
        seasonNotes: {
            春: "春は富士山の雪化粧と新緑のコントラストが美しい。",
            夏: "急登での発汗が多い。水分を多めに持参してください。",
            秋: "紅葉シーズンの眺望は格別。早朝出発がおすすめです。",
            冬: "山頂付近は積雪・凍結あり。アイゼン推奨。必ず現地情報を確認してください。"
        }
    },
    // 百名山（関東エリア）
    {
        name: "那須岳",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "4〜6時間",
        walkTimeMin: 4,
        walkTimeMax: 6,
        feature: "活火山・茶臼岳を中心とした那須連峰。ロープウェイで中腹まで上がれる。山頂付近は荒涼とした火山地形が広がり、朝日岳・三本槍岳への縦走も人気。紅葉シーズンは特に美しい。火山活動のため最新情報を確認すること。",
        accessTrain: "東北新幹線那須塩原駅からバスで山麓駅まで約60分。",
        accessCar: "東北道那須ICから約30分。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: true,
        seasonNotes: {
            春: "残雪がある場合あり。アイゼン持参を検討してください。必ず現地情報を確認してください。",
            夏: "高山植物が美しい季節。火山活動状況を必ず確認してください。",
            秋: "紅葉（10月上旬）が絶景。混雑するため早朝出発を推奨します。",
            冬: "厳冬期は上級者向け。ロープウェイ休止あり。必ず現地情報を確認してください。"
        }
    },
    {
        name: "男体山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜7時間（往復）",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "日光を代表する信仰の山2486m。二荒山神社の御神体で登拝料が必要。急登が続くが山頂からの中禅寺湖・日光連山の眺望は絶景。登山シーズンは5月〜11月末。",
        accessTrain: "東武日光線東武日光駅から路線バスで二荒山神社（登山口）まで約40分。",
        accessCar: "日光道今市ICから約30分（二荒山神社駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "5月開山。残雪が残る場合があります。必ず現地情報を確認してください。",
            夏: "夏が最適シーズン。日差しが強いので帽子・水分を十分に。",
            秋: "紅葉の中禅寺湖を眼下に登れる最高の季節。",
            冬: "11月末閉山。冬期は登山不可。必ず現地情報を確認してください。"
        }
    },
    {
        name: "日光白根山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜7時間（往復）",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "関東以北最高峰2578m。丸沼高原からロープウェイで標高2000m地点まで上がれる。山頂からの眺望は絶景で日光連山・尾瀬・北アルプスまで見渡せる。高山植物も豊富。",
        accessTrain: "東武日光線東武日光駅からバスで丸沼高原スキー場へ（乗り継ぎあり）。",
        accessCar: "関越道沼田ICから約1時間（丸沼高原）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "ロープウェイは春から運行。残雪がある場合あり。必ず現地情報を確認してください。",
            夏: "高山植物の宝庫。ロープウェイ利用で気軽に高山体験できます。",
            秋: "紅葉（9月末〜10月）が美しい。早めの時期から色づき始めます。",
            冬: "冬期はロープウェイ休止または限定運行。必ず現地情報を確認してください。"
        }
    },
    {
        name: "谷川岳",
        area: "関東",
        difficulty: "中級〜上級",
        difficultyLevel: 3,
        walkTimeLabel: "5〜7時間（往復）",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "一ノ倉沢の岸壁で世界的に有名な名峰1977m。ロープウェイで天神平まで上がれる。双耳峰（トマノ耳・オキノ耳）からの稜線歩きと眺望が絶景。紅葉も見事。",
        accessTrain: "上越線土合駅から徒歩でロープウェイ駅まで約15分。上野から約2時間。",
        accessCar: "関越道水上ICから約15分（谷川岳ロープウェイ駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "残雪が多い。軽アイゼン推奨。必ず現地情報を確認してください。",
            夏: "高山植物が咲き誇る。天気が変わりやすいので注意してください。",
            秋: "紅葉（10月上旬）が絶景。天気が急変しやすい季節です。",
            冬: "厳冬期は雪山登山。上級者のみ。必ず現地情報を確認してください。"
        }
    },
    {
        name: "赤城山",
        area: "関東",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "3〜5時間",
        walkTimeMin: 3,
        walkTimeMax: 5,
        feature: "群馬を代表するなだらかな山、最高峰は黒檜山1828m。火口湖（大沼・小沼）の景色が美しい。コースが多様で初心者から楽しめる百名山。冬はワカサギ釣りでも有名。",
        accessTrain: "JR両毛線前橋駅からバスで赤城山ビジターセンターまで約1時間。",
        accessCar: "北関東道前橋南ICから約40分。",
        purposes: ["景色・絶景重視", "のんびりゆるハイク", "周辺観光も楽しみたい"],
        overnightOk: false,
        seasonNotes: {
            春: "新緑が美しい。アカヤシオ（4月）が見頃です。",
            夏: "比較的涼しく快適。大沼でのボートや観光もセットで楽しめます。",
            秋: "紅葉（10月〜11月）が大沼と合わさって絶景です。",
            冬: "積雪あり。大沼のワカサギ釣りが人気。必ず現地情報を確認してください。"
        }
    },
    {
        name: "武尊山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜7時間（往復）",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "群馬最高峰2158m。鎖場が連続するコースで達成感がある。山頂からの展望は広大で尾瀬・日光・谷川連峰を一望。日本武尊が修行したとの伝説が残る信仰の山。",
        accessTrain: "上越新幹線上毛高原駅からタクシーで登山口まで約30分。",
        accessCar: "関越道水上ICから約30分（裏見の滝駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "残雪がある場合あり。アイゼン持参を検討してください。必ず現地情報を確認してください。",
            夏: "緑豊かな山歩きが楽しめる。水分をしっかり持参してください。",
            秋: "紅葉が美しい季節。山頂からの眺望も澄んでいます。",
            冬: "積雪が多い。必ず現地情報を確認してください。"
        }
    },
    {
        name: "至仏山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜7時間（往復）",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "尾瀬国立公園の西端に位置する2228m。花の百名山で高山植物が豊富。尾瀬ヶ原湿原を眼下に望む絶景が人気。時期により登山方向の規制あり。必ず最新情報を確認すること。",
        accessTrain: "上越新幹線上毛高原駅からバスで鳩待峠まで約2時間（季節運行）。",
        accessCar: "関越道沼田ICから戸倉まで約1時間（そこからシャトルバス・マイカー規制）。",
        purposes: ["景色・絶景重視", "のんびりゆるハイク"],
        overnightOk: true,
        seasonNotes: {
            春: "5月は残雪が多い。開山時期を事前確認してください。必ず現地情報を確認してください。",
            夏: "6〜7月の花の季節が最適。尾瀬の水芭蕉と合わせて楽しめます。",
            秋: "草紅葉が美しい。尾瀬ヶ原の紅葉と組み合わせたプランがおすすめ。",
            冬: "閉山期間あり。必ず現地情報を確認してください。"
        }
    },
    {
        name: "燧ヶ岳",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "6〜8時間（往復）",
        walkTimeMin: 6,
        walkTimeMax: 8,
        feature: "東北最高峰2356m。尾瀬の東端に位置し、俎嵓・柴安嵓の2峰からなる。尾瀬沼と尾瀬ヶ原を眼下に見下ろす眺望が絶景。健脚向けの山だが山頂からの景色は格別。",
        accessTrain: "東武鉄道会津高原尾瀬口駅からバスで沼山峠まで約2時間（季節運行）。",
        accessCar: "東北道西那須野塩原ICから御池まで約1時間30分。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: true,
        seasonNotes: {
            春: "5月は積雪あり。開山時期を確認してください。必ず現地情報を確認してください。",
            夏: "6〜7月が最適シーズン。尾瀬沼と合わせた1泊2日プランが人気。",
            秋: "草紅葉の尾瀬と合わせて楽しめる絶景の季節。",
            冬: "閉山期間あり。必ず現地情報を確認してください。"
        }
    },
    {
        name: "皇海山",
        area: "関東",
        difficulty: "中級〜上級",
        difficultyLevel: 3,
        walkTimeLabel: "6〜8時間（往復）",
        walkTimeMin: 6,
        walkTimeMax: 8,
        feature: "栃木・群馬県境の秘境の山2144m。アクセスが難しく林道状況によっては通行不可。クラシックルートは健脚向けで達成感が高い。静かな深山の雰囲気が魅力。必ず最新の林道・登山情報を確認すること。",
        accessTrain: "アクセス困難（実質マイカーのみ）。",
        accessCar: "東北道栃木ICから林道を経由して約2時間（林道状況を必ず事前確認）。",
        purposes: ["難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "林道が開通しているか必ず事前確認。残雪あり。必ず現地情報を確認してください。",
            夏: "最適シーズンだが林道状況次第。情報収集が必須です。",
            秋: "紅葉も楽しめる。日没時間と林道状況を十分確認してください。",
            冬: "冬期は林道閉鎖。入山不可。必ず現地情報を確認してください。"
        }
    },
    {
        name: "丹沢山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "6〜8時間（往復）",
        walkTimeMin: 6,
        walkTimeMax: 8,
        feature: "丹沢主稜の最高峰1567m。塔ノ岳から稜線を縦走して到達する本格的な山。野生のシカが多く山頂付近は笹原が広がる。みやま山荘があり1泊2日プランも可能。",
        accessTrain: "小田急渋沢駅から大倉バス停まで約5分（大倉尾根経由）。",
        accessCar: "東名高速秦野中井ICから約20分（大倉駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: true,
        seasonNotes: {
            春: "新緑の中の縦走が楽しめる。ヒルに注意（5〜10月）。",
            夏: "暑さが厳しい。早朝出発と水分補給を徹底してください。",
            秋: "富士山・相模湾の眺望が澄んで最高の季節。",
            冬: "山頂付近は積雪・凍結あり。アイゼン推奨。必ず現地情報を確認してください。"
        }
    },
    {
        name: "大菩薩嶺",
        area: "関東",
        difficulty: "初級〜中級",
        difficultyLevel: 1,
        walkTimeLabel: "3〜4時間",
        walkTimeMin: 3,
        walkTimeMax: 4,
        feature: "標高2057mの手軽な百名山。上日川峠からなら1時間半で登れる。大菩薩峠からの稜線歩きで富士山・南アルプスの絶景が広がる。初心者にもおすすめの百名山入門コース。",
        accessTrain: "JR中央本線塩山駅からバスで上日川峠まで約40分（季節運行）。",
        accessCar: "中央道勝沼ICから上日川峠まで約40分。",
        purposes: ["景色・絶景重視", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "雪が残る場合あり。バスの運行開始時期を確認してください。必ず現地情報を確認してください。",
            夏: "高原の涼しい風が気持ちよい。富士山の眺めも絶景。",
            秋: "紅葉（10月〜11月）が稜線から楽しめる。",
            冬: "積雪あり。チェーンスパイク推奨。バス運行停止あり。必ず現地情報を確認してください。"
        }
    },
    {
        name: "両神山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜7時間（往復）",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "奥秩父の深山1723m。鎖場が連続するスリリングなコースで達成感が高い。シロヤシオ（5月）やアカヤシオが美しい。両神神社奥社を経由する信仰の道。",
        accessTrain: "西武秩父線西武秩父駅からバスで日向大谷口まで約1時間。",
        accessCar: "関越道花園ICから約1時間20分（日向大谷駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "アカヤシオ・シロヤシオ（5月）が見事。混雑する季節。",
            夏: "緑豊かな山歩き。沢沿いのルートは涼しく快適。",
            秋: "紅葉（11月）が美しい。静かな山歩きが楽しめます。",
            冬: "凍結・積雪あり。鎖場は特に注意。必ず現地情報を確認してください。"
        }
    },
    {
        name: "甲武信ヶ岳",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "7〜9時間（往復）",
        walkTimeMin: 7,
        walkTimeMax: 9,
        feature: "山梨・埼玉・長野の県境に位置する2475m。甲州・武州・信州の頭文字から名付けられた。西沢渓谷からのルートが一般的で渓谷美も楽しめる。千曲川・荒川の源流域にある。",
        accessTrain: "JR中央本線塩山駅からバスまたはタクシーで西沢渓谷入口まで約40分。",
        accessCar: "中央道勝沼ICから西沢渓谷入口まで約50分。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: true,
        seasonNotes: {
            春: "残雪がある場合あり。アイゼン持参を検討してください。必ず現地情報を確認してください。",
            夏: "西沢渓谷の清流と高山の涼しさが魅力。1泊2日で余裕を持った計画を。",
            秋: "紅葉の西沢渓谷と山頂の眺望が楽しめる最高の季節。",
            冬: "厳冬期は積雪が多い。必ず現地情報を確認してください。"
        }
    },
    {
        name: "金峰山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜7時間（往復）",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "山頂の五丈岩が特徴的な奥秩父の名峰2599m。大弛峠（2365m）からのルートは比較的楽に登れる。稜線から富士山・南アルプス・北アルプスを一望できる絶景スポット。",
        accessTrain: "JR中央本線塩山駅からバスで大弛峠まで（季節運行・要確認）。",
        accessCar: "中央道勝沼ICから大弛峠まで約1時間（日本最高所の車道峠）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: true,
        seasonNotes: {
            春: "大弛峠への林道は開通時期を確認してください。残雪あり。必ず現地情報を確認してください。",
            夏: "大弛峠からのルートは比較的楽。稜線からの富士山が美しい。",
            秋: "紅葉と五丈岩のコントラストが絶景。",
            冬: "大弛峠への道路は閉鎖。必ず現地情報を確認してください。"
        }
    },
    {
        name: "瑞牆山",
        area: "関東",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "4〜6時間（往復）",
        walkTimeMin: 4,
        walkTimeMax: 6,
        feature: "花崗岩の巨岩が林立する独特の山容が特徴の2230m。岩場・鎖場が連続し山頂からの展望は素晴らしい。金峰山との縦走も人気。みずがき山自然公園からのルートが一般的。",
        accessTrain: "JR中央本線韮崎駅からバスで瑞牆山荘まで約1時間（季節運行）。",
        accessCar: "中央道須玉ICから約50分（みずがき山自然公園駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "芽吹きの季節。残雪がある場合あり。必ず現地情報を確認してください。",
            夏: "岩場の登山が楽しめる。樹林帯は涼しく快適。",
            秋: "紅葉（10月〜11月）と巨岩のコントラストが美しい。",
            冬: "凍結した岩場は危険。必ず現地情報を確認してください。"
        }
    },
    // 中部・甲信越
    {
        name: "入笠山",
        area: "中部・甲信越",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "2〜3時間",
        walkTimeMin: 2,
        walkTimeMax: 3,
        feature: "ゴンドラで1000m台地へ楽々アクセス。花畑が美しく初心者・家族向け。スノーシューハイクも人気。360度の展望が楽しめる。",
        accessTrain: "JR中央本線富士見駅からバスかタクシー。",
        accessCar: "中央道諏訪南ICから約20分。",
        purposes: ["景色・絶景重視", "周辺観光も楽しみたい", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "春はスズランの群生（5〜6月）が見事。",
            夏: "高原の涼しい風が心地よい。夏の花畑が絶景です。",
            秋: "紅葉と展望が楽しめます。",
            冬: "スノーシューハイクが人気。ゴンドラの営業期間を事前に確認してください。必ず現地情報を確認してください。"
        }
    },
    {
        name: "木曽駒ヶ岳",
        area: "中部・甲信越",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "3〜4時間",
        walkTimeMin: 3,
        walkTimeMax: 4,
        feature: "中央アルプス最高峰2956m。ロープウェイで標高2612mまでアクセス可能。千畳敷カールの景色が圧巻。夏の高山植物が有名。",
        accessTrain: "JR飯田線駒ヶ根駅からバスとロープウェイで千畳敷へ。",
        accessCar: "中央道駒ヶ根ICから約30分（菅の台バスセンター駐車場）。",
        purposes: ["景色・絶景重視", "のんびりゆるハイク"],
        overnightOk: true,
        seasonNotes: {
            春: "5月頃は残雪多く、軽アイゼンが必要です。必ず現地情報を確認してください。",
            夏: "高山植物の宝庫。ロープウェイは混雑するので早めに。",
            秋: "紅葉（9月頃）が絶景。早い時期から色づきます。",
            冬: "厳冬期は上級者向け。必ず現地情報を確認してください。"
        }
    },
    {
        name: "乗鞍岳",
        area: "中部・甲信越",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "2〜4時間",
        walkTimeMin: 2,
        walkTimeMax: 4,
        feature: "マイカー規制エリア。バスで標高2702mまでアクセス可能。そこから3026mの剣ヶ峰まで気軽に高山体験。コマクサなど高山植物が豊富。",
        accessTrain: "松本電鉄新島々駅からバスで乗鞍高原まで約1時間。",
        accessCar: "長野道松本ICから乗鞍高原まで約1.5時間（そこからシャトルバス）。",
        purposes: ["景色・絶景重視", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "残雪があり、軽アイゼンが必要な場合があります。必ず現地情報を確認してください。",
            夏: "バス路線は7月頃から運行。高山植物が見頃です。",
            秋: "紅葉シーズンが美しい。バスの運行期間を確認してください。",
            冬: "冬期はバス運行なし。必ず現地情報を確認してください。"
        }
    },
    {
        name: "北岳",
        area: "中部・甲信越",
        difficulty: "上級",
        difficultyLevel: 3,
        walkTimeLabel: "1泊2日（7〜9時間/日）",
        walkTimeMin: 7,
        walkTimeMax: 9,
        feature: "日本第2位の高峰3193m。南アルプスの盟主。高山植物の宝庫でキタダケソウは固有種。体力・経験が必要な本格的な山。",
        accessTrain: "JR身延線甲府駅から広河原行きバスで約2時間（季節運行）。",
        accessCar: "中央道甲府昭和ICから約2時間（芦安駐車場、そこからバス）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: true,
        seasonNotes: {
            春: "入山不可の時期あり。必ず最新情報を確認してください。",
            夏: "7月〜8月が最適シーズン。バスは季節運行のため事前確認を。必ず現地情報を確認してください。",
            秋: "9月以降は天候が不安定になります。早めの下山計画を。必ず現地情報を確認してください。",
            冬: "厳冬期は入山不可。必ず現地情報を確認してください。"
        }
    },
    {
        name: "御嶽山（木曽）",
        area: "中部・甲信越",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜7時間",
        walkTimeMin: 5,
        walkTimeMax: 7,
        feature: "独立峰3067m。広大な山頂台地と荒涼とした火山地形。火山活動のため一部立入規制あり。",
        accessTrain: "JR中央西線木曽福島駅からバスとロープウェイ（飯森高原まで）。",
        accessCar: "中央道中津川ICから約1.5時間（飯森高原駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "春は残雪あり。アイゼン必携。必ず現地情報を確認してください。",
            夏: "夏が最適シーズン。火山規制の最新情報を必ず確認してください。",
            秋: "紅葉が美しいが、天候が崩れやすい。必ず現地情報を確認してください。",
            冬: "冬期は入山困難。必ず現地情報を確認してください。"
        }
    },
    // 関西
    {
        name: "六甲山",
        area: "関西",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "3〜5時間",
        walkTimeMin: 3,
        walkTimeMax: 5,
        feature: "神戸市街から気軽にアクセス。縦走コースが充実。六甲全山縦走（56km）から日帰りコースまで幅広い。夜景スポットとしても有名。",
        accessTrain: "阪急芦屋川駅 or 阪急岡本駅から登山口まで徒歩。",
        accessCar: "阪神高速芦屋ICから約15分。",
        purposes: ["景色・絶景重視", "周辺観光も楽しみたい", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "新緑が美しく、快適な季節。",
            夏: "暑さが厳しい。早朝出発と水分補給を忘れずに。",
            秋: "紅葉シーズンが特におすすめ。",
            冬: "積雪がある場合あり。凍結注意。必ず現地情報を確認してください。"
        }
    },
    {
        name: "大台ヶ原",
        area: "関西",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "2〜3時間（東大台コース）",
        walkTimeMin: 2,
        walkTimeMax: 3,
        feature: "世界遺産・吉野熊野国立公園内。原生林と展望台からの絶景。日出ヶ岳から大峰山系を一望。雨が多く独特の苔の森が広がる。",
        accessTrain: "近鉄大和上市駅からバス（季節運行・要確認）。",
        accessCar: "名阪国道針ICから約1.5時間（大台ヶ原駐車場まで道路あり）。",
        purposes: ["景色・絶景重視", "周辺観光も楽しみたい", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "新緑の季節。雨が多いのでレインウェアを必ず持参。",
            夏: "苔の緑が美しい季節。霧が多く幻想的な風景が楽しめます。",
            秋: "紅葉（10月頃）が絶景。混雑することがあります。",
            冬: "冬期は積雪あり。バスの運行も停止するため車でのアクセスが必要。必ず現地情報を確認してください。"
        }
    },
    {
        name: "伊吹山",
        area: "関西",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "5〜6時間（往復）",
        walkTimeMin: 5,
        walkTimeMax: 6,
        feature: "滋賀県最高峰1377m。高山植物の宝庫で日本三百名山。琵琶湖を一望。山頂付近は車道でもアクセス可能。",
        accessTrain: "JR琵琶湖線近江長岡駅からバスで登山口まで約10分。",
        accessCar: "名神高速関ヶ原ICから約15分（登山口駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "高山植物の開花（5〜6月）が楽しめます。",
            夏: "日差しが強く暑い。早朝出発がおすすめ。",
            秋: "紅葉と琵琶湖の眺めが絶景です。",
            冬: "雪が多く、アイゼン必携。必ず現地情報を確認してください。"
        }
    },
    {
        name: "金剛山",
        area: "関西",
        difficulty: "初級",
        difficultyLevel: 1,
        walkTimeLabel: "3〜4時間（往復）",
        walkTimeMin: 3,
        walkTimeMax: 4,
        feature: "大阪府最高峰1125m。年間を通じて登山者が多く道が整備されている。霧氷（樹氷）が美しく冬も人気。頂上には葛木神社がある。",
        accessTrain: "近鉄長野線富田林駅からバスで登山口まで約30分。",
        accessCar: "南阪奈道路葛城ICから約20分。",
        purposes: ["景色・絶景重視", "のんびりゆるハイク"],
        overnightOk: false,
        seasonNotes: {
            春: "新緑が美しい。春の山野草も楽しめます。",
            夏: "涼しく快適。大阪から近くアクセスしやすい。",
            秋: "紅葉（11月頃）がきれい。混雑することも。",
            冬: "霧氷が有名。防寒対策を万全に。必ず現地情報を確認してください。"
        }
    },
    {
        name: "武奈ヶ岳",
        area: "関西",
        difficulty: "中級",
        difficultyLevel: 2,
        walkTimeLabel: "4〜6時間（往復）",
        walkTimeMin: 4,
        walkTimeMax: 6,
        feature: "比良山地最高峰1214m。比良山系の盟主として知られる。山頂からの琵琶湖の眺めが絶景。稜線歩きが楽しめる。",
        accessTrain: "JR湖西線比良駅からタクシーまたは徒歩でイン谷口へ。",
        accessCar: "名神高速京都東ICから約1時間（イン谷口駐車場）。",
        purposes: ["景色・絶景重視", "難しいコースに挑戦したい"],
        overnightOk: false,
        seasonNotes: {
            春: "残雪がある場合があります。アイゼン持参を検討してください。必ず現地情報を確認してください。",
            夏: "涼しく比較的快適。水分補給をしっかりと。",
            秋: "紅葉と琵琶湖の眺めが絶品。",
            冬: "雪山になります。十分な装備と経験が必要です。必ず現地情報を確認してください。"
        }
    }
];

// ===== 山イラストSVG生成 =====

function generateMountainSvg(mountain) {
    const W = 400, H = 140;
    // 山名から決定論的シード値（同じ山は常に同じ形状）
    const seed = mountain.name.split('').reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
    const rng = (n) => ((seed * 1664525 + n * 1013904223) >>> 0) / 0xFFFFFFFF;

    const palettes = {
        '関東':       { skyTop: '#b8dff5', skyBot: '#e2f2fb', mt1: '#4e7260', mt2: '#2e5040', mt3: '#1a3428', snow: '#eff5fb', sun: '#fde68a' },
        '中部・甲信越': { skyTop: '#88b4d4', skyBot: '#bcd8ee', mt1: '#3a5868', mt2: '#223e50', mt3: '#102636', snow: '#f8fcff', sun: '#fef3cd' },
        '関西':       { skyTop: '#b0d498', skyBot: '#d4ecc0', mt1: '#4a6c44', mt2: '#2e502a', mt3: '#183418', snow: '#f0f8ec', sun: '#fef3cd' },
    };
    const p = palettes[mountain.area] || palettes['関東'];
    const level = mountain.difficultyLevel || 1;
    const hasSnow = mountain.feature.includes('雪') || mountain.feature.includes('アルプス') ||
                    mountain.feature.includes('氷') || level >= 3;

    const vx = (rng(1) - 0.5) * 24;
    const vy = (rng(2) - 0.5) * 10;
    let mainPeak = '', bgHill = '', snowSvg = '';

    if (level === 1) {
        const cx = W * 0.50 + vx;
        const cy = H * 0.30 + vy;
        mainPeak = `<path d="M0,${H} Q${cx-180},${H*0.58} ${cx-100},${cy+28} Q${cx-30},${cy-8} ${cx},${cy} Q${cx+30},${cy-8} ${cx+100},${cy+28} Q${cx+180},${H*0.58} ${W},${H} Z" fill="${p.mt1}"/>`;
        bgHill   = `<path d="M0,${H} Q${W*0.25},${H*0.68} ${W*0.5},${H*0.63} Q${W*0.75},${H*0.60} ${W},${H*0.70} L${W},${H} Z" fill="${p.mt3}" opacity="0.45"/>`;
        if (hasSnow) snowSvg = `<path d="M${cx},${cy} L${cx-27},${cy+21} Q${cx},${cy+14} ${cx+27},${cy+21} Z" fill="${p.snow}" opacity="0.85"/>`;
    } else if (level === 2) {
        const cx1 = W * 0.36 + vx * 0.8, cy1 = H * 0.20 + vy;
        const cx2 = W * 0.64 - vx * 0.4, cy2 = H * 0.30 + vy * 0.5;
        const sad = H * 0.53;
        mainPeak = `<path d="M0,${H} Q${cx1-120},${H*0.65} ${cx1-58},${cy1+30} L${cx1},${cy1} L${cx1+58},${sad} L${cx2},${cy2} L${cx2+85},${cy2+32} Q${cx2+145},${H*0.65} ${W},${H} Z" fill="${p.mt1}"/>`;
        bgHill   = `<path d="M0,${H} Q${W*0.3},${H*0.66} ${W*0.55},${H*0.62} Q${W*0.75},${H*0.60} ${W},${H*0.68} L${W},${H} Z" fill="${p.mt3}" opacity="0.45"/>`;
        if (hasSnow) snowSvg = `
            <path d="M${cx1},${cy1} L${cx1-22},${cy1+17} Q${cx1},${cy1+11} ${cx1+22},${cy1+17} Z" fill="${p.snow}" opacity="0.90"/>
            <path d="M${cx2},${cy2} L${cx2-18},${cy2+14} Q${cx2},${cy2+9} ${cx2+18},${cy2+14} Z" fill="${p.snow}" opacity="0.82"/>`;
    } else {
        const cx1 = W * 0.26 + vx * 0.5, cy1 = H * 0.26 + vy * 0.7;
        const cx2 = W * 0.50,             cy2 = H * 0.10 + vy * 0.3;
        const cx3 = W * 0.74 - vx * 0.3, cy3 = H * 0.22 + vy * 0.5;
        mainPeak = `<path d="M0,${H} L${cx1-90},${H} L${cx1},${cy1} L${cx1+62},${H*0.50} L${cx2},${cy2} L${cx2+62},${H*0.50} L${cx3},${cy3} L${cx3+90},${H} Z" fill="${p.mt1}"/>`;
        bgHill   = `<path d="M0,${H} L${cx2-180},${H} L${cx2},${cy2+65} L${cx2+180},${H} Z" fill="${p.mt3}" opacity="0.4"/>`;
        snowSvg  = `
            <path d="M${cx1},${cy1} L${cx1-18},${cy1+15} L${cx1+18},${cy1+15} Z" fill="${p.snow}" opacity="0.88"/>
            <path d="M${cx2},${cy2} L${cx2-26},${cy2+21} L${cx2+26},${cy2+21} Z" fill="${p.snow}" opacity="0.95"/>
            <path d="M${cx3},${cy3} L${cx3-16},${cy3+13} L${cx3+16},${cy3+13} Z" fill="${p.snow}" opacity="0.85"/>`;
    }

    const fgPath = `M0,${H} Q${W*0.2},${H*0.74} ${W*0.45},${H*0.78} Q${W*0.65},${H*0.80} ${W*0.85},${H*0.74} Q${W*0.94},${H*0.72} ${W},${H*0.74} L${W},${H} Z`;
    const sunX = W * (0.06 + rng(5) * 0.15);
    const sunY = H * (0.12 + rng(6) * 0.14);
    const sunR = 10 + rng(7) * 3;
    const gradId = `mtn-sky-${seed}`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="display:block;width:100%;height:140px">
        <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${p.skyTop}"/>
                <stop offset="100%" stop-color="${p.skyBot}"/>
            </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#${gradId})"/>
        <circle cx="${sunX}" cy="${sunY}" r="${sunR + 6}" fill="${p.sun}" opacity="0.22"/>
        <circle cx="${sunX}" cy="${sunY}" r="${sunR}" fill="${p.sun}" opacity="0.72"/>
        ${bgHill}
        ${mainPeak}
        ${snowSvg}
        <path d="${fgPath}" fill="${p.mt2}"/>
    </svg>`;
}

// ===== 出発地点 → エリアマッピング =====

const DEPARTURE_TO_AREA = {
    '東京・新宿': '関東',
    '横浜':       '関東',
    'さいたま':   '関東',
    '千葉':       '関東',
    '名古屋':     '中部・甲信越',
    '長野・松本': '中部・甲信越',
    '甲府':       '中部・甲信越',
    '大阪・梅田': '関西',
    '京都':       '関西',
    '神戸・三宮': '関西',
    '奈良':       '関西',
};

// ===== 出発地点からの所要時間データ =====

const TRAVEL_TIMES = {
    '高尾山': {
        '東京・新宿': { train: '約50分',      car: '約1時間' },
        '横浜':       { train: '約1時間10分',  car: '約1時間20分' },
        'さいたま':   { train: '約1時間30分',  car: '約1時間20分' },
        '千葉':       { train: '約1時間40分',  car: '約1時間30分' },
    },
    '筑波山': {
        '東京・新宿': { train: '約1時間40分',  car: '約1時間30分' },
        'さいたま':   { train: '約1時間20分',  car: '約1時間15分' },
        '千葉':       { train: '約1時間30分',  car: '約1時間15分' },
        '横浜':       { train: '約2時間',      car: '約1時間50分' },
    },
    '大山（丹沢）': {
        '横浜':       { train: '約50分',       car: '約50分' },
        '東京・新宿': { train: '約1時間20分',  car: '約1時間20分' },
        'さいたま':   { train: '約1時間40分',  car: '約1時間30分' },
        '千葉':       { train: '約1時間40分',  car: '約1時間30分' },
    },
    '御岳山（奥多摩）': {
        '東京・新宿': { train: '約1時間30分',  car: '約1時間20分' },
        '横浜':       { train: '約2時間',      car: '約1時間50分' },
        'さいたま':   { train: '約1時間40分',  car: '約1時間30分' },
        '千葉':       { train: '約2時間',      car: '約1時間50分' },
    },
    '陣馬山〜高尾山縦走': {
        '東京・新宿': { train: '約1時間',      car: '約1時間' },
        '横浜':       { train: '約1時間20分',  car: '約1時間20分' },
        'さいたま':   { train: '約1時間30分',  car: '約1時間20分' },
        '千葉':       { train: '約1時間40分',  car: '約1時間30分' },
    },
    '雲取山': {
        '東京・新宿': { train: '約2時間30分',  car: '約2時間' },
        'さいたま':   { train: '約2時間30分',  car: '約1時間50分' },
        '横浜':       { train: '約3時間',      car: '約2時間30分' },
        '千葉':       { train: '約3時間',      car: '約2時間30分' },
    },
    '塔ノ岳（丹沢）': {
        '横浜':       { train: '約1時間',      car: '約1時間' },
        '東京・新宿': { train: '約1時間30分',  car: '約1時間30分' },
        'さいたま':   { train: '約1時間50分',  car: '約1時間40分' },
        '千葉':       { train: '約2時間',      car: '約1時間50分' },
    },
    '入笠山': {
        '東京・新宿': { train: '約1時間40分',  car: '約2時間' },
        '甲府':       { train: '約1時間',      car: '約1時間20分' },
        '長野・松本': { train: '約1時間',      car: '約1時間' },
        '名古屋':     { train: '約2時間30分',  car: '約2時間' },
    },
    '木曽駒ヶ岳': {
        '名古屋':     { train: '約2時間30分',  car: '約2時間' },
        '長野・松本': { train: '約1時間30分',  car: '約1時間30分' },
        '東京・新宿': { train: '約3時間',      car: '約3時間' },
        '甲府':       { train: '約2時間30分',  car: '約2時間30分' },
    },
    '乗鞍岳': {
        '長野・松本': { train: '約2時間',      car: '約1時間30分' },
        '名古屋':     { train: '約3時間',      car: '約2時間30分' },
        '東京・新宿': { train: '約3時間',      car: '約3時間' },
        '甲府':       { train: '約2時間30分',  car: '約2時間30分' },
    },
    '北岳': {
        '東京・新宿': { train: '約3時間',      car: '約2時間30分' },
        '甲府':       { train: '約1時間30分',  car: '約1時間' },
        '名古屋':     { train: '約3時間30分',  car: '約3時間' },
        '長野・松本': { train: '約3時間',      car: '約2時間30分' },
    },
    '御嶽山（木曽）': {
        '名古屋':     { train: '約2時間',      car: '約2時間' },
        '長野・松本': { train: '約1時間30分',  car: '約1時間30分' },
        '東京・新宿': { train: '約3時間30分',  car: '約3時間30分' },
        '甲府':       { train: '約3時間',      car: '約3時間' },
    },
    '六甲山': {
        '神戸・三宮': { train: '約30分',       car: '約30分' },
        '大阪・梅田': { train: '約50分',       car: '約1時間' },
        '京都':       { train: '約1時間30分',  car: '約1時間30分' },
        '奈良':       { train: '約1時間30分',  car: '約1時間30分' },
    },
    '大台ヶ原': {
        '大阪・梅田': { train: '約2時間30分',  car: '約2時間' },
        '奈良':       { train: '約2時間',      car: '約1時間30分' },
        '京都':       { train: '約2時間30分',  car: '約2時間' },
        '神戸・三宮': { train: '約3時間',      car: '約2時間30分' },
    },
    '伊吹山': {
        '名古屋':     { train: '約1時間30分',  car: '約1時間30分' },
        '大阪・梅田': { train: '約2時間',      car: '約2時間' },
        '京都':       { train: '約1時間30分',  car: '約1時間20分' },
        '神戸・三宮': { train: '約2時間',      car: '約2時間' },
    },
    '金剛山': {
        '大阪・梅田': { train: '約1時間',      car: '約1時間' },
        '奈良':       { train: '約1時間',      car: '約50分' },
        '京都':       { train: '約1時間30分',  car: '約1時間30分' },
        '神戸・三宮': { train: '約1時間30分',  car: '約1時間30分' },
    },
    '武奈ヶ岳': {
        '京都':       { train: '約50分',       car: '約50分' },
        '大阪・梅田': { train: '約1時間',      car: '約1時間' },
        '神戸・三宮': { train: '約1時間30分',  car: '約1時間30分' },
        '奈良':       { train: '約1時間30分',  car: '約1時間30分' },
    },
    // 百名山（関東エリア）
    '那須岳': {
        '東京・新宿': { train: '約2時間30分',  car: '約2時間' },
        'さいたま':   { train: '約2時間',      car: '約1時間45分' },
        '横浜':       { train: '約3時間',      car: '約2時間30分' },
        '千葉':       { train: '約3時間',      car: '約2時間30分' },
    },
    '男体山': {
        '東京・新宿': { train: '約2時間30分',  car: '約2時間' },
        'さいたま':   { train: '約2時間',      car: '約1時間45分' },
        '横浜':       { train: '約3時間',      car: '約2時間30分' },
        '千葉':       { train: '約3時間',      car: '約2時間30分' },
    },
    '日光白根山': {
        '東京・新宿': { train: '約2時間30分',  car: '約2時間30分' },
        'さいたま':   { train: '約2時間',      car: '約2時間' },
        '横浜':       { train: '約3時間',      car: '約3時間' },
        '千葉':       { train: '約3時間',      car: '約3時間' },
    },
    '谷川岳': {
        '東京・新宿': { train: '約2時間',      car: '約1時間45分' },
        'さいたま':   { train: '約1時間45分',  car: '約1時間30分' },
        '横浜':       { train: '約2時間30分',  car: '約2時間15分' },
        '千葉':       { train: '約2時間30分',  car: '約2時間15分' },
    },
    '赤城山': {
        '東京・新宿': { train: '約1時間30分',  car: '約1時間30分' },
        'さいたま':   { train: '約1時間10分',  car: '約1時間10分' },
        '横浜':       { train: '約2時間',      car: '約2時間' },
        '千葉':       { train: '約2時間',      car: '約2時間' },
    },
    '武尊山': {
        '東京・新宿': { train: '約2時間',      car: '約2時間' },
        'さいたま':   { train: '約1時間45分',  car: '約1時間45分' },
        '横浜':       { train: '約2時間30分',  car: '約2時間30分' },
        '千葉':       { train: '約2時間30分',  car: '約2時間30分' },
    },
    '至仏山': {
        '東京・新宿': { train: '約3時間',      car: '約2時間30分' },
        'さいたま':   { train: '約2時間30分',  car: '約2時間' },
        '横浜':       { train: '約3時間30分',  car: '約3時間' },
        '千葉':       { train: '約3時間30分',  car: '約3時間' },
    },
    '燧ヶ岳': {
        '東京・新宿': { train: '約3時間30分',  car: '約2時間30分' },
        'さいたま':   { train: '約3時間',      car: '約2時間' },
        '横浜':       { train: '約4時間',      car: '約3時間' },
        '千葉':       { train: '約4時間',      car: '約3時間' },
    },
    '皇海山': {
        '東京・新宿': { train: '約3時間以上',  car: '約2時間30分' },
        'さいたま':   { train: '約3時間以上',  car: '約2時間' },
        '横浜':       { train: '約3時間以上',  car: '約3時間' },
        '千葉':       { train: '約3時間以上',  car: '約3時間' },
    },
    '丹沢山': {
        '横浜':       { train: '約1時間',      car: '約1時間' },
        '東京・新宿': { train: '約1時間30分',  car: '約1時間30分' },
        'さいたま':   { train: '約2時間',      car: '約1時間45分' },
        '千葉':       { train: '約2時間',      car: '約2時間' },
    },
    '大菩薩嶺': {
        '東京・新宿': { train: '約1時間30分',  car: '約2時間' },
        '横浜':       { train: '約2時間',      car: '約2時間' },
        'さいたま':   { train: '約2時間',      car: '約2時間30分' },
        '千葉':       { train: '約2時間30分',  car: '約2時間30分' },
    },
    '両神山': {
        '東京・新宿': { train: '約2時間',      car: '約2時間' },
        'さいたま':   { train: '約1時間30分',  car: '約1時間30分' },
        '横浜':       { train: '約2時間30分',  car: '約2時間30分' },
        '千葉':       { train: '約2時間30分',  car: '約2時間30分' },
    },
    '甲武信ヶ岳': {
        '東京・新宿': { train: '約2時間',      car: '約2時間' },
        '横浜':       { train: '約2時間30分',  car: '約2時間' },
        'さいたま':   { train: '約2時間30分',  car: '約2時間' },
        '千葉':       { train: '約2時間30分',  car: '約2時間30分' },
    },
    '金峰山': {
        '東京・新宿': { train: '約2時間',      car: '約2時間' },
        '横浜':       { train: '約2時間30分',  car: '約2時間' },
        'さいたま':   { train: '約2時間30分',  car: '約2時間30分' },
        '千葉':       { train: '約3時間',      car: '約2時間30分' },
    },
    '瑞牆山': {
        '東京・新宿': { train: '約2時間',      car: '約1時間50分' },
        '横浜':       { train: '約2時間30分',  car: '約2時間' },
        'さいたま':   { train: '約2時間30分',  car: '約2時間' },
        '千葉':       { train: '約3時間',      car: '約2時間30分' },
    },
};

// ===== 起動 =====

document.addEventListener('DOMContentLoaded', () => {
    initShareFromUrl();
});

// ===== ステップ遷移 =====

function goToStep(target) {
    if (target === 2 && !validateStep1()) return;

    ['step1', 'step2', 'results'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    for (let i = 1; i <= 2; i++) {
        const el = document.getElementById(`indicator-${i}`);
        el.classList.remove('active', 'done');
        if (i < target) el.classList.add('done');
        if (i === target) el.classList.add('active');
    }
    const line = document.getElementById('line-1');
    if (line) line.classList.toggle('done', target > 1);

    document.getElementById(`step${target}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== バリデーション =====

function validateStep1() {
    const stay      = document.querySelector('input[name="stay"]:checked');
    const departure = document.querySelector('input[name="departure"]:checked');
    const transport = document.querySelector('input[name="transport"]:checked');
    if (!stay || !departure || !transport) {
        alert('すべての項目を選択してください');
        return false;
    }
    userInputs.stay      = stay.value;
    userInputs.departure = departure.value;
    userInputs.area      = DEPARTURE_TO_AREA[departure.value];
    userInputs.transport = transport.value;
    return true;
}

function validateStep2() {
    const walkTime = document.querySelector('input[name="walkTime"]:checked');
    if (!walkTime) {
        alert('希望のコースタイムを選択してください');
        return false;
    }
    const purposes = [...document.querySelectorAll('input[name="purpose"]:checked')].map(el => el.value);
    userInputs.walkTime = walkTime.value;
    userInputs.purposes = purposes;
    return true;
}

// ===== フォーム送信 =====

async function submitForm() {
    if (!validateStep2()) return;

    userInputs.season = getCurrentSeason();

    ['step1', 'step2'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    for (let i = 1; i <= 2; i++) {
        const el = document.getElementById(`indicator-${i}`);
        el.classList.remove('active');
        el.classList.add('done');
    }
    document.getElementById('line-1').classList.add('done');

    document.getElementById('results').classList.remove('hidden');
    document.getElementById('loadingSection').classList.remove('hidden');
    document.getElementById('resultsContent').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    await new Promise(resolve => setTimeout(resolve, 800));

    try {
        mountainSuggestions = getMockMountainSuggestions(userInputs);
        displayMountains();
    } catch (e) {
        console.error('山の提案取得に失敗しました:', e);
        document.getElementById('loadingSection').classList.add('hidden');
        alert(`エラーが発生しました: ${e.message}`);
    }
}

function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    return month >= 3 && month <= 5 ? '春' :
           month >= 6 && month <= 8 ? '夏' :
           month >= 9 && month <= 11 ? '秋' : '冬';
}

// ===== モック: 山提案ロジック =====

function getMockMountainSuggestions(inputs) {
    let candidates = MOUNTAINS_DB.filter(m => m.area === inputs.area);

    // コースタイムから難易度上限を推定
    const maxDifficultyMap = {
        '〜3時間':  1,
        '3〜5時間': 2,
        '5〜7時間': 3,
        '7時間以上': 3
    };
    const maxDifficulty = maxDifficultyMap[inputs.walkTime] || 3;

    const walkTimeRanges = {
        '〜3時間':  [0, 3],
        '3〜5時間': [3, 5],
        '5〜7時間': [5, 7],
        '7時間以上': [7, 999]
    };
    const [minWalk, maxWalk] = walkTimeRanges[inputs.walkTime] || [0, 999];

    const scored = candidates.map(m => {
        let score = 0;

        // 難易度が上限を超えたら大幅減点
        if (m.difficultyLevel > maxDifficulty) score -= 50;
        else score += (4 - (maxDifficulty - m.difficultyLevel)) * 20;

        // 歩行時間マッチング
        const overlap = Math.min(m.walkTimeMax, maxWalk) - Math.max(m.walkTimeMin, minWalk);
        if (overlap > 0) score += 35;

        // 目的マッチング
        if (inputs.purposes && inputs.purposes.length > 0) {
            const purposeMatch = inputs.purposes.filter(p => m.purposes.includes(p)).length;
            score += purposeMatch * 15;
        }

        // 日程マッチング
        if (inputs.stay === '1泊2日' && m.overnightOk) score += 10;
        if (inputs.stay === '日帰り' && !m.overnightOk) score += 5;

        return { ...m, score };
    });

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 5).map(m => {
        const useCar = inputs.transport === '車';
        const access = useCar ? m.accessCar : m.accessTrain;
        const matchedPurpose = inputs.purposes && inputs.purposes.find(p => m.purposes.includes(p));
        const reason = matchedPurpose
            ? `「${matchedPurpose}」のご希望に合っています。`
            : 'コースタイムとエリアの条件に合っています。';

        return {
            name: m.name,
            area: m.area,
            difficulty: m.difficulty,
            walkTime: m.walkTimeLabel,
            feature: m.feature,
            access,
            reason,
            seasonNote: m.seasonNotes[inputs.season] || '',
            purposes: m.purposes,
            _raw: m
        };
    });
}

// ===== モック: 装備リスト生成 =====

function getMockEquipmentList(mountain, inputs) {
    const categories = [];

    categories.push({
        category: "基本装備（必須）",
        items: [
            "登山靴またはトレッキングシューズ",
            `リュックサック（${inputs.stay === '日帰り' ? '20〜30L' : '40〜50L'}）`,
            "レインウェア上下（防水透湿素材推奨）",
            "帽子（つば付き）",
            "行動食（おにぎり・エネルギーバー・ナッツ等）",
            `飲料水（${inputs.stay === '日帰り' ? '500ml×2本以上' : '500ml×3本以上'}）`,
            "ヘッドライト（予備電池付き）",
            "ファーストエイドキット",
            "携帯電話・モバイルバッテリー",
            "現金",
            "タオル",
            "日焼け止め"
        ]
    });

    const seasonItems = {
        春: { category: "春の追加装備", items: ["防寒着（フリースまたは薄手ダウン）", "手袋（薄手）", "虫除けスプレー（4月以降）", "ゲイター（残雪・泥道対策）"] },
        夏: { category: "夏の追加装備", items: ["速乾性の登山シャツ・パンツ", "サングラス（紫外線対策）", "日焼け止め（SPF50以上推奨）", "塩分補給タブレットまたは経口補水液", "飲料水（通常の1.5倍を目安に）", "虫除けスプレー", "汗拭きシート"] },
        秋: { category: "秋の追加装備", items: ["防寒着（ダウン・フリース）", "手袋", "ネックウォーマー（10月以降）", "防水スプレー（靴・ウェア用）"] },
        冬: { category: "冬の追加装備（必須）", items: ["防寒インナー（ウールまたはポリエステル製）", "ミドルレイヤー（フリースまたはダウン）", "防風・防水のハードシェル", "保温手袋（防水・インナーグローブ併用推奨）", "ニット帽またはバラクラバ", "ネックウォーマー", "アイゼン（チェーンスパイク以上）", "ストック", "ゲイター（ロング）", "サングラスまたはゴーグル", "カイロ", "非常食（多めに）"] }
    };
    if (seasonItems[inputs.season]) categories.push(seasonItems[inputs.season]);

    const diffItems = {
        '初級': { category: "ナビゲーション", items: ["スマホ地図アプリ（YAMAPなど・オフラインマップをDL）", "ストック（オプション・膝への負担を軽減）"] },
        '中級': { category: "安全装備", items: ["ストック（推奨）", "ホイッスル（緊急時用）", "エマージェンシーシート", "テーピングテープ（多め）", "地図（紙）とコンパス"] },
        '上級': { category: "安全装備（上級）", items: ["ストック（必須）", "ヘルメット（岩場・鎖場がある場合）", "エマージェンシーシート", "ホイッスル", "地形図（紙）とコンパス", "ツェルト（緊急用簡易テント）"] }
    };
    if (diffItems[mountain.difficulty]) categories.push(diffItems[mountain.difficulty]);

    if (inputs.stay === '1泊2日') {
        categories.push({
            category: "山小屋泊の追加装備",
            items: ["着替え（1泊分：速乾性素材推奨）", "室内履き（サンダル等）", "洗面用具（簡易的なもの）", "耳栓", "山小屋の予約確認書または連絡先", "現金（1〜2万円目安）"]
        });
    }

    return categories;
}

// ===== 山カード表示 =====

function displayMountains() {
    document.getElementById('loadingSection').classList.add('hidden');
    document.getElementById('resultsContent').classList.remove('hidden');

    const container = document.getElementById('mountainCards');
    container.innerHTML = '';
    compareItems = [];
    updateCompareBar();

    const transportIcon = userInputs.transport === '電車・公共交通機関' ? '🚃' : '🚗';
    const travelKey = userInputs.transport === '電車・公共交通機関' ? 'train' : 'car';

    mountainSuggestions.forEach((m, i) => {
        const diffClass =
            m.difficulty.includes('初') ? 'badge-beginner' :
            m.difficulty.includes('中') ? 'badge-intermediate' : 'badge-advanced';

        // 出発地からの所要時間（データがある場合は優先表示）
        const travelTime = TRAVEL_TIMES[m.name]?.[userInputs.departure]?.[travelKey];
        const accessShort = travelTime
            ? `${userInputs.departure}から${travelTime}`
            : m.access.split('。')[0];

        const card = document.createElement('div');
        card.className = 'mountain-card';
        card.id = `mountain-card-${i}`;
        card.innerHTML = `
            <div class="mountain-card-image">${generateMountainSvg(m._raw)}</div>
            <div class="card-body">
                <div class="card-title-row">
                    <h3>${escapeHtml(m.name)}</h3>
                    <span class="badge ${diffClass}">${escapeHtml(m.difficulty)}</span>
                </div>
                <div class="card-meta">
                    <span>⏱ ${escapeHtml(m.walkTime)}</span>
                    <span>${transportIcon} ${escapeHtml(accessShort)}</span>
                </div>
                <p class="card-feature">${escapeHtml(m.feature)}</p>
                ${m.seasonNote ? `<p class="card-season">⚠️ ${escapeHtml(m.seasonNote)}</p>` : ''}
                <div class="card-actions">
                    <button class="card-compare-btn" id="compare-btn-${i}" onclick="toggleCompare(${i})">＋ 比較に追加</button>
                    <button class="card-select-btn" onclick="selectMountain(${i})">装備を見る</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== 比較機能 =====

function toggleCompare(index) {
    const pos = compareItems.indexOf(index);
    if (pos === -1) {
        if (compareItems.length >= 3) {
            showToast('比較できるのは最大3件までです');
            return;
        }
        compareItems.push(index);
        document.getElementById(`mountain-card-${index}`).classList.add('in-compare');
        document.getElementById(`compare-btn-${index}`).textContent = '✓ 比較中';
    } else {
        compareItems.splice(pos, 1);
        document.getElementById(`mountain-card-${index}`).classList.remove('in-compare');
        document.getElementById(`compare-btn-${index}`).textContent = '＋ 比較に追加';
    }
    updateCompareBar();
}

function updateCompareBar() {
    const bar = document.getElementById('compareBar');
    const list = document.getElementById('compareList');
    if (compareItems.length === 0) {
        bar.classList.add('hidden');
        return;
    }
    bar.classList.remove('hidden');
    list.innerHTML = compareItems.map(i => {
        const m = mountainSuggestions[i];
        return `<span class="compare-chip">${escapeHtml(m.name)}</span>`;
    }).join('');
}

function clearCompare() {
    compareItems.forEach(i => {
        document.getElementById(`mountain-card-${i}`).classList.remove('in-compare');
        document.getElementById(`compare-btn-${i}`).textContent = '＋ 比較に追加';
    });
    compareItems = [];
    updateCompareBar();
}

function showComparison() {
    if (compareItems.length < 2) {
        showToast('2件以上選んでから比較してください');
        return;
    }
    const mountains = compareItems.map(i => mountainSuggestions[i]);
    const tableHead = '<tr><th>項目</th>' + mountains.map(m => `<th>${escapeHtml(m.name)}</th>`).join('') + '</tr>';
    const tableBody = [
        `<tr><td>難易度</td>${mountains.map(m => `<td>${escapeHtml(m.difficulty)}</td>`).join('')}</tr>`,
        `<tr><td>コースタイム</td>${mountains.map(m => `<td>${escapeHtml(m.walkTime)}</td>`).join('')}</tr>`,
        `<tr><td>特徴</td>${mountains.map(m => `<td class="td-feature">${escapeHtml(m.feature)}</td>`).join('')}</tr>`,
        `<tr><td>アクセス</td>${mountains.map(m => `<td>${escapeHtml(m.access)}</td>`).join('')}</tr>`,
    ].join('');

    const modal = document.createElement('div');
    modal.className = 'compare-modal-overlay';
    modal.innerHTML = `
        <div class="compare-modal">
            <div class="compare-modal-header">
                <h3>山を比較</h3>
                <button onclick="this.closest('.compare-modal-overlay').remove()" class="modal-close">✕</button>
            </div>
            <div class="compare-table-wrapper">
                <table class="compare-table">
                    <thead>${tableHead}</thead>
                    <tbody>${tableBody}</tbody>
                </table>
            </div>
        </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
}

// ===== シェア機能 =====

function shareResults() {
    const payload = {
        v: 1,
        stay: userInputs.stay,
        area: userInputs.area,
        departure: userInputs.departure,
        transport: userInputs.transport,
        walkTime: userInputs.walkTime,
        purposes: userInputs.purposes || [],
        mountains: mountainSuggestions.map(m => m.name)
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    history.replaceState(null, '', '#share=' + encoded);
    const shareUrl = location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast('URLをコピーしました！LINEなどで貼り付けて共有できます');
        }).catch(() => {
            showToast('URLをコピーしてください：' + shareUrl);
        });
    } else {
        showToast('URLをコピーしてシェアしてください');
    }
}

function initShareFromUrl() {
    const hash = location.hash;
    if (!hash.startsWith('#share=')) {
        goToStep(1);
        return;
    }
    try {
        const encoded = hash.slice(7);
        const data = JSON.parse(decodeURIComponent(escape(atob(encoded))));
        userInputs = {
            stay:      data.stay      || '日帰り',
            departure: data.departure || '東京・新宿',
            area:      data.area      || DEPARTURE_TO_AREA[data.departure] || '関東',
            transport: data.transport || '車',
            walkTime:  data.walkTime  || '3〜5時間',
            purposes:  data.purposes  || [],
            season:    getCurrentSeason()
        };
        mountainSuggestions = (data.mountains || [])
            .map(name => MOUNTAINS_DB.find(m => m.name === name))
            .filter(Boolean)
            .map(m => {
                const useCar = userInputs.transport === '車';
                const access = useCar ? m.accessCar : m.accessTrain;
                const matchedPurpose = userInputs.purposes.find(p => m.purposes.includes(p));
                return {
                    name: m.name,
                    area: m.area,
                    difficulty: m.difficulty,
                    walkTime: m.walkTimeLabel,
                    feature: m.feature,
                    access,
                    reason: matchedPurpose
                        ? `「${matchedPurpose}」のご希望に合っています。`
                        : 'コースタイムとエリアの条件に合っています。',
                    seasonNote: m.seasonNotes[userInputs.season] || '',
                    purposes: m.purposes,
                    _raw: m
                };
            });

        // ステップインジケーターを完了状態に
        for (let i = 1; i <= 2; i++) {
            const el = document.getElementById(`indicator-${i}`);
            el.classList.remove('active');
            el.classList.add('done');
        }
        document.getElementById('line-1').classList.add('done');

        ['step1', 'step2'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('loadingSection').classList.add('hidden');
        document.getElementById('resultsContent').classList.remove('hidden');
        displayMountains();
        showToast('友人からシェアされた山のリストを表示しています');
    } catch (e) {
        console.error('シェアURLの解析に失敗しました:', e);
        goToStep(1);
    }
}

// ===== トースト通知 =====

let toastTimer = null;

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('toast-show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
}

// ===== 山選択・装備リスト表示 =====

async function selectMountain(index) {
    document.querySelectorAll('.mountain-card').forEach(c => c.classList.remove('selected'));
    document.getElementById(`mountain-card-${index}`).classList.add('selected');

    const mountain = mountainSuggestions[index];
    document.getElementById('selectedMountainName').textContent =
        `📋 ${mountain.name}（${mountain.difficulty}・${userInputs.season}・${userInputs.stay}）の装備リスト`;

    const section = document.getElementById('equipmentSection');
    section.classList.remove('hidden');
    document.getElementById('equipmentList').innerHTML =
        '<p style="color:#888;padding:12px 0;">装備リストを生成中...</p>';
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    await new Promise(resolve => setTimeout(resolve, 400));

    try {
        const categories = getMockEquipmentList(mountain, userInputs);
        renderEquipmentList(categories);
    } catch (e) {
        console.error('装備リスト取得に失敗しました:', e);
        document.getElementById('equipmentList').innerHTML =
            '<p style="color:red;">装備リストの取得に失敗しました。もう一度お試しください。</p>';
    }
}

function renderEquipmentList(categories) {
    const container = document.getElementById('equipmentList');
    container.innerHTML = '';

    categories.forEach((cat, ci) => {
        const section = document.createElement('div');
        section.className = 'equipment-category';

        const heading = document.createElement('h4');
        heading.textContent = cat.category;
        section.appendChild(heading);

        cat.items.forEach((item, ii) => {
            const id = `eq-${ci}-${ii}`;
            const row = document.createElement('div');
            row.className = 'equipment-item';
            row.id = `row-${id}`;
            row.innerHTML = `
                <input type="checkbox" id="${id}" onchange="toggleEquipmentItem('${id}')">
                <label for="${id}">${escapeHtml(item)}</label>
            `;
            section.appendChild(row);
        });

        container.appendChild(section);
    });
}

function toggleEquipmentItem(id) {
    const row = document.getElementById(`row-${id}`);
    const cb  = document.getElementById(id);
    row.classList.toggle('checked', cb.checked);
}

// ===== リセット =====

function resetApp() {
    userInputs = {};
    mountainSuggestions = [];
    compareItems = [];
    history.replaceState(null, '', location.pathname);

    document.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);

    document.getElementById('mountainCards').innerHTML = '';
    document.getElementById('equipmentList').innerHTML = '';
    document.getElementById('equipmentSection').classList.add('hidden');
    document.getElementById('resultsContent').classList.add('hidden');
    document.getElementById('loadingSection').classList.add('hidden');
    document.getElementById('compareBar').classList.add('hidden');

    goToStep(1);
}

// ===== XSS対策 =====

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
