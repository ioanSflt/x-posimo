import { useCallback, useEffect, useState } from "react";

const duneQuery_execute = "https://api.dune.com/api/v1/query/1279213/execute";
const duneQuery_results = "https://api.dune.com/api/v1/query/1279213/execute";

export const getDuneQueryExecute = (query_id: string) => {
  return `https://api.dune.com/api/v1/query/${query_id}/execute`;
};

export const getDuneQueryStatus = (execution_id: string) => {
  return `https://api.dune.com/api/v1/execution/${execution_id}/status`;
};

export const getDuneQueryResults = (execution_id: string) => {
  return `https://api.dune.com/api/v1/execution/${execution_id}/results`;
};

export const queryRequestOptions = {
  method: "POST",
  headers: {
    "x-dune-api-key": process.env.NEXT_PUBLIC_DUNE_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query_parameters: {
      to_addr: "\\x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF",
      from_addr: "\\xbb1332e692e701bfc0e3c19ffd4dd619c599ea2a",
    },
  }),
};

export const executionRequestOptions = {
  method: "GET",
  headers: {
    "x-dune-api-key": process.env.NEXT_PUBLIC_DUNE_API_KEY,
  },
};

export const fetcher = async (url: any, options: any) => {
  const response = await fetch(url, options);
  const data = response.json();
  return data;
};

export const useHasCompleted = (execution_id: string | undefined) => {
  const [hasCompleted, setHasCompleted] = useState<boolean>();

  useEffect(() => {
    if (execution_id) {
      const checkInterval = setInterval(() => {
        fetcher(getDuneQueryStatus(execution_id), {
          method: "GET",
          headers: {
            "x-dune-api-key": process.env.NEXT_PUBLIC_DUNE_API_KEY,
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (response.state === "QUERY_STATE_COMPLETED") {
            setHasCompleted(true);
            clearInterval(checkInterval);
          }
        });
      }, 1000);
    }
  }, [execution_id]);

  return [hasCompleted];
};

export const useHasConnectionTo = (addr: string) => {
  const [hasConnection, setHasConnection] = useState<boolean>();
  const [execution_id, setExecution_id] = useState();
  const [hasCompleted] = useHasCompleted(execution_id);
  //   let hasConection: boolean = false;

  useEffect(() => {
    if (addr) {
      // execute the query
      const executeQuery = fetcher(getDuneQueryExecute("1279213"), {
        method: "POST",
        headers: {
          "x-dune-api-key": process.env.NEXT_PUBLIC_DUNE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query_parameters: {
            to_addr: "\\x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF", //dangerous address
            from_addr: addr,
          },
        }),
      }).then((response) => {
        console.log("execution", response);
        if (response.execution_id) {
          setExecution_id(response.execution_id);
        }
      });
    }
  }, [addr]);

  useEffect(() => {
    if (hasCompleted && execution_id) {
      const executionResults = fetcher(
        getDuneQueryResults(execution_id),
        executionRequestOptions
      ).then((response) => {
        setHasConnection(response.result.rows.length > 0);
      });
    }
  }, [hasCompleted]);

  return [hasConnection];

  //   console.log(executeQuery);

  //   let isCompleted: boolean | undefined = undefined;

  //   const check = setInterval(async function () {
  //     // ask for the execution status
  //     if (executeQuery.execution_id) {
  //       const executionStatus = await fetcher(
  //         `${process.env.NEXT_PUBLIC_DUNE_RESULT_1}/${executeQuery.execution_id}/status`,
  //         executionRequestOptions
  //       );

  //       // console.log(executionStatus);

  //       // check if the execution is completed
  //       if (executionStatus.state === "QUERY_STATE_COMPLETED") {
  //         isCompleted = true;
  //         const executionResults = await fetcher(
  //           getDuneQueryStatus(executeQuery.execution_id),
  //           executionRequestOptions
  //         );

  //         // console.log(executionResults);
  //         hasConection = executionResults.result.rows.length > 0;
  //       }
  //     }
  //     if (isCompleted) clearInterval(check);
  //   }, 500);
};

export const useTopReceiveAccounts = (from_addr: string) => {
  const [topReceive, setTopReceive] = useState<boolean>();
  const [execution_id, setExecution_id] = useState();
  const [hasCompleted] = useHasCompleted(execution_id);
  //   let hasConection: boolean = false;

  useEffect(() => {
    if (from_addr) {
      // execute the query
      const executeQuery = fetcher(getDuneQueryExecute("1280135"), {
        method: "POST",
        headers: {
          "x-dune-api-key": process.env.NEXT_PUBLIC_DUNE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query_parameters: {
            from_addr: from_addr,
          },
        }),
      }).then((response) => {
        console.log("execution", response);
        if (response.execution_id) {
          setExecution_id(response.execution_id);
        }
      });
    }
  }, [from_addr]);

  useEffect(() => {
    if (hasCompleted && execution_id) {
      const executionResults = fetcher(
        getDuneQueryResults(execution_id),
        executionRequestOptions
      ).then((response) => {
        setTopReceive(response.result.rows);
      });
    }
  }, [hasCompleted]);

  return [topReceive];
};

export const useTopSendAccounts = (from_addr: string) => {
  const [topSend, setTopSend] = useState<boolean>();
  const [execution_id, setExecution_id] = useState();
  const [hasCompleted] = useHasCompleted(execution_id);
  //   let hasConection: boolean = false;

  useEffect(() => {
    if (from_addr) {
      // execute the query
      const executeQuery = fetcher(getDuneQueryExecute("1280047"), {
        method: "POST",
        headers: {
          "x-dune-api-key": process.env.NEXT_PUBLIC_DUNE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query_parameters: {
            from_addr: from_addr,
          },
        }),
      }).then((response) => {
        console.log("execution", response);
        if (response.execution_id) {
          setExecution_id(response.execution_id);
        }
      });
    }
  }, [from_addr]);

  useEffect(() => {
    if (hasCompleted && execution_id) {
      const executionResults = fetcher(
        getDuneQueryResults(execution_id),
        executionRequestOptions
      ).then((response) => {
        setTopSend(response.result.rows);
      });
    }
  }, [hasCompleted]);

  return [topSend];
};

export const useNbrTxs = (from_addr: string) => {
  const [nbrTxs, setNbrTxs] = useState<boolean>();
  const [execution_id, setExecution_id] = useState();
  const [hasCompleted] = useHasCompleted(execution_id);
  //   let hasConection: boolean = false;

  useEffect(() => {
    if (from_addr) {
      // execute the query
      const executeQuery = fetcher(getDuneQueryExecute("1280150"), {
        method: "POST",
        headers: {
          "x-dune-api-key": process.env.NEXT_PUBLIC_DUNE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query_parameters: {
            from_addr: from_addr,
          },
        }),
      }).then((response) => {
        console.log("execution", response);
        if (response.execution_id) {
          setExecution_id(response.execution_id);
        }
      });
    }
  }, [from_addr]);

  useEffect(() => {
    if (hasCompleted && execution_id) {
      const executionResults = fetcher(
        getDuneQueryResults(execution_id),
        executionRequestOptions
      ).then((response) => {
        console.log("Number", response);
        setNbrTxs(response.result.rows[0].count);
      });
    }
  }, [hasCompleted]);

  return [nbrTxs];
};
