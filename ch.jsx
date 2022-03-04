import { useEffect, useState } from 'react';
import data from './data.txt';
const Chain1 = () => {
    const [value, setValue] = useState();
    const [path, setPath] = useState([]);
    const [options, setOptions] = useState([]);

    const splitBy = (sep) => (xs) =>
        xs.split(sep).map(s => s.trim());
    const nest = ([p, ...ps], v, o) =>
        p === undefined ? o : (console.log(v),{ ...o, [p]: ps.length === 0 ? v : nest(ps, v, o[p] || {}) })
    const convert = (lines) => lines
        .split('\n')
        .filter(Boolean)
        .map(splitBy('-'))
        .map(([id, desc]) => [id, splitBy('>')(desc)])
        .reduce((a, [id, path]) => nest([...path, 'id'], id, a), {});

    const handleChange = (index, event) => {
        let key = event.target.value;
        const newOptions = options.slice(0, index + 1);
        const newPath = path.slice(0, index + 1);
        let nestedValue = {};
        newPath[index] = key;
        for (let i = 0; i < newPath.length; i++) {
            if (i === 0) {
                nestedValue = value[newPath[0]];
            }
            else {
                nestedValue = nestedValue[newPath[i]];
            }
        }
        newPath[index + 1] = "--Choose--";
        ("id" in nestedValue) && delete nestedValue["id"];
        const keys = Object.keys(nestedValue);
        if (keys.length) {
            newOptions[index + 1] = keys;
        }
        setOptions(newOptions);
        setPath(newPath);
    };
    useEffect(() => {
        fetch(data).then(res => res.text().then(res => {
            let resvalue = convert(res);
            console.log(resvalue);
            setValue(resvalue);
            setOptions([Object.keys(resvalue)]);
            setPath(["--Choose--"]);
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>
        {
            path.map((_, index) =>
                options[index] && <select key={index} value={path[index]} onChange={(e) => handleChange(index, e)}>
                    {
                        options[index].map((v, i) =>
                            <option key={`${v}-${i}`} value={v}>{v}</option>
                        )
                    }
                </select>

            )
        }
    </>;
}
export default Chain1;
