import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
} from "././../../../components/defaults";
import { useHistory } from "react-router";
import { URLgetter, URLupdate } from "../../../utils/lib/URLupdate";
// import { ButtonTrack } from "features/analytics/ButtonTrack"

const SearchTab = () => {
  const [tab, setTab] = useState("all");
  const history = useHistory();
  const searchParams = new URLSearchParams(history.location.search);
  const query = searchParams.get("q") || "";

  const tabs = useMemo(() => {
    return [
      {
        name: "All",
        value: "all",
      },
      {
        name: "Universities & Scholarships",
        value: "uni",
      },
      {
        name: "Users",
        value: "user",
      },
      {
        name: "Posts",
        value: "post",
      },
      {
        name: "Spaces",
        value: "space",
      },
      {
        name: "Orgs",
        value: "org",
      },
    ];
  }, []);

  useEffect(() => {
    const getTab = URLgetter("tab");
    if (getTab) {
      setTab(getTab);
    } else {
      setTab("all");
    }
  }, [history.location.search]);

  return (
    <Card className="shadow-none  ion-no-margin ion-no-padding border-b-2 w-full border-neutral-300 rounded-none">
      <CardContent>
        {query.length > 0 && (
          <Typography variant="p">
            {" "}
            <span className="text-neutral-800 font-medium">
              {" "}
              Search Result For:
            </span>{" "}
            {`"${query}"`}
          </Typography>
        )}
        <div
          style={{
            display: "inline-flex",
            gap: "1rem",
            marginTop: "1.5rem",
            overflow: "auto",
          }}
        >
          {tabs.map((t, index) => (
            <Typography
              variant="h5"
              key={index}
              style={{
                cursor: "pointer",

                color: t.value === tab ? "#3171e0" : "",
                borderBottom: t.value === tab ? "2px solid #3171e0" : "",
              }}
              className="w-fit  max-md:!text-[11px] max-md:text-neutral-800 max-md:font-medium"
              onClick={() => {
                const urldata = URLupdate("tab", t.value);
                history.push({ search: urldata });
                // ButtonTrack(`${t.value} search tab clicked`)
              }}
            >
              {t.name}
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchTab;
